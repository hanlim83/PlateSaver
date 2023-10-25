<template>
  <div class="about">
    <div class = "row justify-content-center p-3">
        <img src="@/assets/logo.png" style="width:40%;height:;">      
    </div>

    <div class = "row p-3 justify-content-center">
      <div class = "col-7 col-md-4 text-center">
        PlateSaver aims to inspire, educate, and empower individuals and communities to reduce food waste through sharing sustainable practices in a community-centered food-sharing blog. 
      </div>
    </div>


    <div class = "row p-3 justify-content-center text-center">
        <div class = "col-9">
          <h2>Proudly Aligned with United Nations Sustainable Development Goals</h2>
      </div>
    </div>
    <div class = "row justify-content-center p-3">
      <img src="@/assets/SDG3.png" style="width:30%;height:auto;">   
      <img src="@/assets/SDG4.png" style="width:30%;height:auto;">   
      <img src="@/assets/SDG12.png" style="width:30%;height:auto;">   
    </div>

    <div>
        <p id = "demo"></p>
        <button onclick="getLocation()">Try It</button>
    </div>


  </div>
    

</template>

<script>
    const x = document.getElementById('demo')
    function getLocation() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude;
    }


</script>

