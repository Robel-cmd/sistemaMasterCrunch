function initVentasPorEmpleado() {
    const canvasElement = document.getElementById('ventas_por_empleado');
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');

    // ¡Importante! Faltaba limpiar la instancia anterior aquí también
    if (window.mySalesChart instanceof Chart) {
        window.mySalesChart.destroy();
    }

    window.mySalesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Javier O.', 'Ricardo M.', 'Robel S.', 'Debier L.', 'Jonathan P.'],
            datasets: [{
                label: 'Ventas (L.)',
                data: [12952, 18400, 9500, 21200, 15300],
                backgroundColor: '#ffae0069',
                borderColor: '#ffae00',
                borderWidth: 1,
                borderRadius: 5,
                maxBarThickness: 52
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: '#f0f0f05d', borderDash: [4, 4] } }
            }
        }
    });
}

function initProductosMasVendidos() {
    const canvasElement = document.getElementById('productos_mas_vendidos');
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');

    if (window.myProductsChart instanceof Chart) {
        window.myProductsChart.destroy();
    }

    window.myProductsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pollo con Tajadas', 'Pollo Frito Estilo Campero', 'Alitas Barbacoa', 'Pollo Crujiente (Crispy)', 'Pechuga a la Plancha'],
            datasets: [{
                label: 'Productos Vendidos',
                data: [120, 95, 65, 80, 40],
                backgroundColor: [
                    '#ff00005c', 
                    '#ff9d3b5c', 
                    '#11ff005c', 
                    '#ff4fd05c', 
                    '#00e6d35c'
                ],
                borderColor: [
                    '#ff0000', 
                    '#ff9d3b', 
                    '#11ff00', 
                    '#ff4fd0', 
                    '#00e6d3'
                ],
                borderWidth: 2,
                borderRadius: 4 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return ` ${label}: ${value} vendidos`;
                        }
                    }
                }
            }
        }
    });
}

function initVentasPorHora() {
    const canvasElement = document.getElementById('ventas_por_hora');



    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');

    if (window.myHourlySalesChart instanceof Chart) {
        window.myHourlySalesChart.destroy();
    }
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(255, 174, 0, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 174, 0, 0)');
    
    window.myHourlySalesChart = new Chart(ctx, {
        
        type: 'line',
        data: {
            labels: ['00:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00', '03:00 - 04:00', '04:00 - 05:00'],
            datasets: [{
                label: 'Ventas (L.)',
                data: [12, 4, 8, 16, 1],
                backgroundColor: gradient,
                borderColor: '#ff911c',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: '#f0f0f015', borderDash: [4, 4] } }
            }
        }
    });
}