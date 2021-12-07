const alertBanner = document.getElementById("alert");
const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("mobile-chart");
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
const traffic = document.querySelector(".traffic-nav");



alertBanner.innerHTML = 
`
<div class="alert-banner">
    <p><strong>Alert:</strong> You have unread messages</p>
    <p class="alert-banner-close">x</p>
</div>
`

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = "none"
    }
});

function showNotifications() {
    document.getElementById("notifications").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.bell-icon')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

// Line graph

let trafficDataDefault = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [{
    data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    fill: true,
    lineTension: .5
  }]
};

let trafficDataWk = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [{
    data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    fill: true,
    lineTension: .5
  }]
};

let trafficDataHr = {
  labels: ["4a-6a", "6a-8a", "8a-10a", "10a-12p", "12p-2p", "2p-4p", "4p-6p", "6p-8p", "8p-10p", "10p-12a", "12a-2a", "2a-4a"],
  datasets: [{
    data: [7, 10, 13, 17, 23, 21, 18, 15, 9, 8, 6, 5],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    fill: true,
    lineTension: .5
  }]
};

let trafficDataDay = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [{
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    fill: true,
    lineTension: .5
  }]
};

let trafficDataMn = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [{
    data: [6200, 5000, 4000, 8000, 6000, 7000, 5000, 7400, 9000, 6000, 10000, 8500],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    fill: true,
    lineTension: .5
  }]
};

let trafficOptions = {
  aspectRatio: 2.5,
  animation: {
    duration: 0
  },
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficDataDefault,
  options: trafficOptions
});

// Chart Update Function from Project Resources

const updateChart = (chart, newData) => {
  chart.data.labels = newData.labels;
  chart.data.datasets[0].data = newData.datasets[0].data;
  chart.update();
};

// Update traffic chart from Slack

traffic.addEventListener('click', (e) => {
  if (e.target.classList.contains('hourly')) {
    document.getElementsByClassName('active')[0].classList.remove('active');
    e.target.classList.add('active');
    updateChart(trafficChart, trafficDataHr);
  }
  if (e.target.classList.contains('daily')) {
    document.getElementsByClassName('active')[0].classList.remove('active');
    e.target.classList.add('active');
    updateChart(trafficChart, trafficDataDay);
  }
  if (e.target.classList.contains('weekly')) {
    document.getElementsByClassName('active')[0].classList.remove('active');
    e.target.classList.add('active');
    updateChart(trafficChart, trafficDataWk);
  }
  if (e.target.classList.contains('monthly')) {
    document.getElementsByClassName('active')[0].classList.remove('active');
    e.target.classList.add('active');
    updateChart(trafficChart, trafficDataMn);
  }
});

// Bar graph

const dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [{
    label: '# of Hits',
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: '#7477BF',
    borderWidth: 1
  }]
};

const dailyOptions = {
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions
});

// Doughnut chart

const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [{
    label: '# of Users',
    data: [2000, 550, 500],
    borderWidth: 0,
    backgroundColor: [
      '#7477BF',
      '#78CF82',
      '#51B6C8'
    ]
  }]
};

const mobileOptions = {
  aspectRatio: 2,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 20,
        fontStyle: 'bold'
      }
    }
  }
};

let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
});

// Messaging section

send.addEventListener('click', () => {

  if (user.value === "" && message.value === "") {
    alert("Please fill out user and message fields before sending");
  } else if (user.value === "" ) {
    alert("Please fill out user field before sending");
  } else if (message.value === "" ) {
    alert("Please fill out message field before sending");
  } else {
    alert(`Message successfully sent to: ${user.value}`);
  }
});

// Autocomplete user search (from w3schools.com)

const userSearch = document.getElementById('userField');
const userNames = ["Victoria Chambers", "Dale Byrd", "Dawn Wood", "Dan Oliver"];

function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener("input", function(e) {
      let a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      userField.insertAdjacentElement('afterend', a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { 
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

autocomplete(document.getElementById("userField"), userNames);

// Local Storage

const emailSetting = document.getElementById("setting-email");
const profileSetting = document.getElementById("setting-profile");
const timezone = document.getElementById("timezone");
const save = document.getElementById("save");
const cancel = document.getElementById("cancel");

save.onclick = saveSettings;

function saveSettings() {
  localStorage.setItem("setting-email", emailSetting.checked);
  localStorage.setItem("setting-profile", profileSetting.checked);
  localStorage.setItem("timezone", timezone.value);
}

document.querySelector("#cancel").addEventListener("click", () => {
  const switches = document.querySelectorAll(".switch input");
  for (let s of switches) {
    s.checked = false;
  }
  localStorage.clear();
  timezone.value = "Select Timezone";
  localStorage.setItem("timezone", "Select Timezone");
});


let emailChecked = JSON.parse(localStorage.getItem("setting-email"));
document.getElementById("setting-email").checked = emailChecked;

let profileChecked = JSON.parse(localStorage.getItem("setting-profile"));
document.getElementById("setting-profile").checked = profileChecked;

let timezoneSelected = localStorage.getItem("timezone");
document.getElementById("timezone").value = timezoneSelected;

if (localStorage.getItem("timezone") === 0) {
  localStorage.setItem("timezone", "Select Timezone");
  timezone.value = "Select Timezone";
}

if (timezone.value == 0) {
  timezone.value = "Select Timezone";
}

