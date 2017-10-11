document.addEventListener('DOMContentLoaded', () => {

  const menuBtn = document.getElementById('menu-button');
  const notificationBtn = document.getElementById('notification-btn');
  const messagesBtn = document.getElementById('messages-btn');
  const settingsBtn = document.getElementById('settings-btn');

  const theme = document.getElementById('theme');

  const aside = document.getElementById('aside');
  const notificationDropdown = document.getElementById('notification-dropdown');
  const messagesDropdown = document.getElementById('messages-dropdown');
  const settingsDropdown = document.getElementById('settings-dropdown');

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

  settingsBtn.addEventListener('click', e => {
    settingsDropdown.classList.toggle('show-settings-dropdown');
  });

  // console.log(localStorage.theme);

  // if (localStorage.theme) {
  //   theme.setAttribute('href', 'css/' + localStorage.theme);
  // }

  document.getElementById('default').addEventListener('click', e => {
    theme.setAttribute("href", "css/default.css");
    // localStorage.theme = 'default.css';
  });

  document.getElementById('green').addEventListener('click', e => {
    theme.setAttribute("href", "css/green.css");
    // localStorage.theme = 'green.css';
  });

  document.getElementById('red').addEventListener('click', e => {
    theme.setAttribute("href", "css/red.css");
    // localStorage.theme = 'red.css';
  });

  document.getElementById('pink').addEventListener('click', e => {
    theme.setAttribute("href", "css/pink.css");
    // localStorage.theme = 'pink.css';
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

  // const gitResponsive = [
  //   ['screen and (max-width: 640px)', {
  //     axisX: {
  //       showLabel: false,
  //       labelInterpolationFnc: value => {
  //         return value[0];
  //       }
  //     }
  //   }]
  // ];

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
  // new Chartist.Pie('#pie-chart-2', pieData, pieOptions);

  new Chartist.Line('#pie-chart-2', {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [1, 2, 3, 1, -2, 0, 1, 0],
      [-2, -1, -2, -1, -2.5, -1, -2, -1],
      [0, 0, 0, 1, 2, 2.5, 2, 1],
      [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
    ]
  }, {
    high: 3,
    low: -3,
    height: '250px',
    showArea: true,
    showLine: false,
    showPoint: false,
    fullWidth: true,
    axisX: {
      showLabel: false,
      showGrid: false
    }
  });

  new Chartist.Bar('#pie-chart-3', {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    ]
  }, {
    stackBars: true,
    height: '250px',
    axisY: {
      labelInterpolationFnc: function(value) {
        return (value / 1000) + 'k';
      }
    }
  }).on('draw', function(data) {
    if(data.type === 'bar') {
      data.element.attr({
        style: 'stroke-width: 30px'
      });
    }
  });

  // END OF CHARTS

});
