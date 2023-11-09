<script setup>
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useDatabaseList, useDatabase } from 'vuefire'
import { ref as dbRef } from 'firebase/database'

const route = useRoute()
const db = useDatabase()
const allusers = useDatabaseList(dbRef(db, 'users'))

if (route.query.state != null && route.query.state === 'logout') {
  toast('Logged Out Successfully', {
    autoClose: 5000,
    type: 'success'
  })
} else if (route.query.state != null && route.query.state === 'login') {
  toast('Logged In Successfully', {
    autoClose: 5000,
    type: 'success'
  })
} else if (route.query.state != null && route.query.state === 'verified') {
  toast('Email Verified Successfully', {
    autoClose: 5000,
    type: 'success'
  })
}
</script>
<template>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <div class="home">
    <div class="outerlayer">
      <img src="@/assets/frontpage.jpeg" style="width: 100%" />
      <div class="container">
        <div class="coast">
          <div class="wave-rel-wrap">
            <div class="wave"></div>
          </div>
        </div>
        <div class="coast delay">
          <div class="wave-rel-wrap">
            <div class="wave delay"></div>
          </div>
        </div>
        <div class="text text-w">Number</div>
        <div class="text text-a">of</div>
        <div class="text text-v">Plate</div>
        <div class="text text-e">Savers</div>
      </div>
      <div class="box" style="left: 15%" v-if="allusers.length > 1000">{{ parseInt(allusers.length.toString()[0]) % 10 }}</div>
      <div class="box" style="left: 15%" v-else>0</div>
      <div class="box" style="left: 30%" v-if="allusers.length > 1000">{{ parseInt(allusers.length.toString()[0]) % 10 }}</div>
      <div class="box" style="left: 30%" v-else>0</div>
      <div class="box" style="left: 45%" v-if="allusers.length > 100">{{ parseInt(allusers.length.toString()[0]) % 10 }}</div>
      <div class="box" style="left: 45%" v-else>0</div>
      <div class="box" style="left: 60%" v-if="allusers.length > 10">{{ parseInt(allusers.length.toString()[0]) % 10 }}</div>
      <div class="box" style="left: 60%" v-else>0</div>
      <div class="box" style="left: 75%">{{ allusers.length % 10 }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$textDur: 1000ms;
$waveDur: 8000ms;

.box{
  margin-top: 5vh;
}
.container {
  position: absolute;
  width: 17rem;
  height: 10rem;
  top: 30%;
  transform: translate(-50%, -50%);
}

.text {
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  font-family: 'Muli', Helvetica, sans-serif;
  bottom: 0;
  -webkit-text-stroke-color: rgb(89, 81, 196);
  -webkit-text-stroke-width: 2.5px;
  -webkit-box-reflect: below -30px linear-gradient(transparent, #211e1e2e);
  animation: text $textDur ease-in infinite;
  transform: translatez(0);
  &-w {
    left: -2rem; //position
    transform: translate3d(0, -4rem, 0);
    animation: text-w $textDur ease-in infinite;
  }
  &-a {
    left: 10rem;
    animation-delay: 150ms;
  }
  &-v {
    left: 13.75rem;
    transform: translate3d(0, -4rem, 0);
    animation-delay: 500ms;
  }
  &-e {
    left: 21.5rem;
    animation-delay: 750ms;
  }
}

.coast {
  // wave: translate-x
  position: absolute;
  left: -10rem;
  bottom: -3rem;
  width: 6.2rem;
  height: 2.2rem;
  display: inline-block;
  animation: coast $waveDur linear infinite;
  transform: translateZ(0);
}

.wave-rel-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 5rem;
  perspective-origin: 0%, 50%;
}

.wave {
  // wave: width && scale && rotate
  position: absolute;
  width: 37rem;
  height: 1.2rem; // height of running wave
  border-radius: 1.1rem;
  background: radial-gradient(ellipse at center, rgba(116, 241, 252, 1) 0%, rgba(50, 230, 255, 1) 73%, rgba(21, 199, 250, 1) 100%);
  display: inline-block;
  animation: wave $waveDur linear infinite;
  will-change: width;
  transform: translateZ(0) scale(0);
}

.delay {
  animation-delay: $waveDur / 2;
}

@keyframes text {
  0% {
    transform: translate3d(0, 0, 0);
  }
  30% {
    transform: translate3d(0, 0, 0);
  }
  45% {
    transform: translate3d(0, -2rem, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes text-w {
  0% {
    transform: translate3d(0, -2rem, 0);
  }
  38% {
    transform: translate3d(0, -2rem, 0);
  }
  69% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -2rem, 0);
  }
}

@keyframes coast {
  //flow starting position
  0% {
    transform: translate3d(2rem, 0, 0);
  }

  50% {
    transform: translate3d(27rem, 0, 0);
  }
  100% {
    transform: translate3d(27rem, 0, 0);
  }
}

@keyframes wave {
  0% {
    transform: scale(0);
    width: 2.2rem;
  }
  10% {
    transform: scale(1);
    width: 9rem;
  }
  23% {
    width: 2.2rem;
  }
  30% {
    width: 3.5rem;
  }
  35% {
    width: 2.2rem;
  }

  40% {
    width: 7.1rem;
  }
  48% {
    width: 5rem;
    transform: rotateY(0deg) scale(1, 1);
  }
  56% {
    transform: rotateY(90deg) scale(0.6, 0.2);
  }
  57% {
    transform: rotateY(90deg) scale(0);
  }
  100% {
    transform: rotateY(90deg) scale(0);
  }
}




@media screen and (max-width: 700px) {
  .container {
  position: absolute;
  width: 17rem;
  height: 10rem;
  top: 20%;
  transform: translate(-50%, -50%);
  }
  .text {
  font-size: 200%;
  display: inline-block;
  position: absolute;
  font-family: 'Muli', Helvetica, sans-serif;
  bottom: 0;
  -webkit-text-stroke-color: rgb(89, 81, 196);
  -webkit-text-stroke-width: 2.5px;
  -webkit-box-reflect: below -30px linear-gradient(transparent, #211e1e2e);
  animation: text $textDur ease-in infinite;
  transform: translatez(0);
  &-w {
    left: 4rem; //position
    transform: translate3d(0, -4rem, 0);
    animation: text-w $textDur ease-in infinite;
  }
  &-a {
    left: 11.5rem;
    animation-delay: 150ms;
  }
  &-v {
    left: 13.75rem;
    transform: translate3d(0, -4rem, 0);
    animation-delay: 500ms;
  }
  &-e {
    left: 21rem;
    animation-delay: 750ms;
  }
}
.wave {
  // wave: width && scale && rotate

  width: 20rem;
 
}

@keyframes coast {
  //flow starting position
  0% {
    transform: translate3d(8rem, 0, 0);
  }

  50% {
    transform: translate3d(27rem, 0, 0);
  }
  100% {
    transform: translate3d(27rem, 0, 0);
  }
}

@keyframes wave {
  0% {
    transform: scale(0);
    width: 1rem;
  }
  10% {
    transform: scale(1);
    width: 9rem;
  }
  23% {
    width: 2.2rem;
  }
  30% {
    width: 3.5rem;
  }

  40% {
    width: 7.1rem;
  }
  48% {
    width: 5rem;
    transform: rotateY(0deg) scale(1, 1);
  }
  56% {
    transform: rotateY(90deg) scale(0.6, 0.2);
  }
  57% {
    transform: rotateY(90deg) scale(0);
  }
  100% {
    transform: rotateY(90deg) scale(0);
  }
}


}
</style>
