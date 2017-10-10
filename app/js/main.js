document.addEventListener('DOMContentLoaded', () => {

  const menuBtn = document.getElementById('menu-button');
  const notificationBtn = document.getElementById('notification-btn');
  const messagesBtn = document.getElementById('messages-btn');

  const aside = document.getElementById('aside');
  const notificationDropdown = document.getElementById('notification-dropdown');
  const messagesDropdown = document.getElementById('messages-dropdown');

  menuBtn.addEventListener('click', e => {
    aside.classList.toggle('open');
    aside.classList.toggle('closed');
  });

  notificationBtn.addEventListener('click', e => {
    notificationDropdown.classList.toggle('show-dropdown');
  });

  messagesBtn.addEventListener('click', e => {
    messagesDropdown.classList.toggle('show-dropdown');
  });

  window.onclick = e => {
    if (!e.target.matches('#notification-btn')) {
      if (notificationDropdown.classList.contains('show-dropdown')) {
        notificationDropdown.classList.remove('show-dropdown');
      }
    }
    if (!e.target.matches('#messages-btn')) {
      if (messagesDropdown.classList.contains('show-dropdown')) {
        messagesDropdown.classList.remove('show-dropdown');
      }
    }
  }

  if (window.innerWidth >= 950) {
    aside.classList.add('open');
  } else {
    aside.classList.add('closed');
  }

  window.onresize = e => {
    if (window.innerWidth >= 950) {
      aside.classList.add('open');
      aside.classList.remove('closed');
    } else {
      aside.classList.add('closed');
      aside.classList.remove('open');
    }
  }

  // CHARTS
  const gitData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
    series: [
      [12, 15, 15, 16, 18, 20, 25],
      [5, 3, 7, 9, 10, 15, 23],
      [3, 2, 4, 3, 7, 12, 13]
    ]
  };

  const gitOptions = {
    showPoint: false,
    showArea: true,
    fullWidth: true,
    height: '250px',
    axisX: {
      showGrid: false
    }
    // chartPadding: {
    //   right: 60
    // }
  };

  const gitResponsive = [
    ['screen and (max-width: 640px)', {
      axisX: {
        showLabel: false,
        labelInterpolationFnc: value => {
          return value[0];
        }
      }
    }]
  ];

  new Chartist.Line('#git-chart', gitData, gitOptions);

  const pieData = {
    series: [42, 25, 16, 17]
  };

  const sum = function(a, b) {
    return a + b;
  }

  const pieOptions = {
    height: '250px',
    labelInterpolationFnc: value => {
      return Math.round(value / pieData.series.reduce(sum) * 100) + '%';
    }
  };

  new Chartist.Pie('#pie-chart', pieData, pieOptions);
  new Chartist.Pie('#pie-chart-2', pieData, pieOptions);
  // END OF CHARTS

});
