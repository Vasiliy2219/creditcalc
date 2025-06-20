let paymentChart = null;

function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const term = parseInt(document.getElementById('term').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const paymentType = document.getElementById('paymentType').value;

    if (!loanAmount || !term || !interestRate) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const schedule = paymentType === 'annuity' 
        ? calculateAnnuityPayments(loanAmount, term, interestRate)
        : calculateDifferentialPayments(loanAmount, term, interestRate);

    displaySchedule(schedule);
    createChart(schedule);
    saveCalculation(schedule);
}

function calculateAnnuityPayments(loanAmount, term, interestRate) {
    const monthlyRate = interestRate / 12;
    const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    let balance = loanAmount;
    const schedule = [];

    for (let i = 1; i <= term; i++) {
        const interest = balance * monthlyRate;
        const principal = payment - interest;
        balance -= principal;

        schedule.push({
            payment: payment,
            principal: principal,
            interest: interest,
            balance: Math.max(0, balance)
        });
    }

    return schedule;
}

function calculateDifferentialPayments(loanAmount, term, interestRate) {
    const monthlyRate = interestRate / 12;
    const principal = loanAmount / term;
    let balance = loanAmount;
    const schedule = [];

    for (let i = 1; i <= term; i++) {
        const interest = balance * monthlyRate;
        const payment = principal + interest;
        balance -= principal;

        schedule.push({
            payment: payment,
            principal: principal,
            interest: interest,
            balance: Math.max(0, balance)
        });
    }

    return schedule;
}

function displaySchedule(schedule) {
    const tbody = document.querySelector('#paymentSchedule tbody');
    tbody.innerHTML = '';

    schedule.forEach((payment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${payment.payment.toFixed(2)}</td>
            <td>${payment.principal.toFixed(2)}</td>
            <td>${payment.interest.toFixed(2)}</td>
            <td>${payment.balance.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

function createChart(schedule) {
    const ctx = document.getElementById('paymentChart').getContext('2d');
    
    if (paymentChart) {
        paymentChart.destroy();
    }

    const totalPrincipal = schedule.reduce((sum, payment) => sum + payment.principal, 0);
    const totalInterest = schedule.reduce((sum, payment) => sum + payment.interest, 0);

    paymentChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Основной долг', 'Проценты'],
            datasets: [{
                data: [totalPrincipal, totalInterest],
                backgroundColor: ['#4CAF50', '#FFC107']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function saveCalculation(schedule) {
    const data = {
        loanAmount: parseFloat(document.getElementById('loanAmount').value),
        term: parseInt(document.getElementById('term').value),
        interestRate: parseFloat(document.getElementById('interestRate').value),
        paymentType: document.getElementById('paymentType').value,
        schedule: schedule
    };

    fetch('/save_calculation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}

function saveToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Добавляем поддержку кириллицы
    doc.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');
    
    // Заголовок
    doc.setFontSize(16);
    doc.text('График платежей', 20, 20);
    
    // Данные кредита
    doc.setFontSize(12);
    doc.text(`Сумма кредита: ${document.getElementById('loanAmount').value}`, 20, 30);
    doc.text(`Срок: ${document.getElementById('term').value} месяцев`, 20, 40);
    doc.text(`Процентная ставка: ${document.getElementById('interestRate').value}%`, 20, 50);
    doc.text(`Тип платежа: ${document.getElementById('paymentType').value === 'annuity' ? 'Аннуитетный' : 'Дифференцированный'}`, 20, 60);
    
    // Получаем данные таблицы
    const table = document.getElementById('paymentSchedule');
    const rows = Array.from(table.rows);
    
    // Подготавливаем данные для таблицы
    const tableData = rows.map(row => 
        Array.from(row.cells).map(cell => cell.innerText)
    );
    
    // Создаем таблицу
    doc.autoTable({
        head: [tableData[0]],
        body: tableData.slice(1),
        startY: 70,
        theme: 'grid',
        styles: {
            font: 'Roboto',
            fontSize: 10,
            cellPadding: 5
        },
        headStyles: {
            fillColor: [76, 175, 80]
        }
    });
    
    // Сохраняем PDF
    doc.save('credit-schedule.pdf');
}