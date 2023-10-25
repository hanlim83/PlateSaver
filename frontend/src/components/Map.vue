<template>
    <h1>User Location Page</h1>
    <div id = "app">
        <h1>Your Coordinates : </h1>
        <p>{{ coordinates.lat}} Latitude, {{ coordinates.lng }} Longitude</p>

    </div>


</template>

<script>
    export default {
        data(){
            return {
                coordinates : {
                    lat : 0,
                    lng : 0
                }
            }
        },
        created(){
            // get user's coordinates from browser request
            this.$getLocation({})
                .then(coordinates =>
                )
        }
    }

</script>
      