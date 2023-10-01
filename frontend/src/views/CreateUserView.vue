<template>
  <div class="create-user">
    <form>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="name">
      </div>
      <div class="mb-3">
        <label for="age" class="form-label">Age</label>
        <input type="text" class="form-control" id="age" v-model="age">
      </div>
      <button type="submit" class="btn btn-primary" @click="createUser()">Submit</button>
    </form>

    <br>
    <button type="button" class="btn btn-primary" @click="getUsers()">Get Users</button>
    <br>

    <div>
      <table v-if="canViewTable" class="table">
        <thead>
          <th>Name</th>
          <th>Age</th>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <th scope="col">{{ user.name }}</th>
            <th scope="col">{{ user.age }}</th>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
const API_URL = "http://localhost:4000/";
import axios from 'axios'

export default {
  name: "CreateUserView",
  data() {
    return {
      name: "",
      age: "",
      users: [],
      canViewTable: false
    }
  },
  components: {

  },
  methods: {
    async getUsers() {
      let response = await axios.get(API_URL + 'users');
      this.users = response.data.data;
      this.canViewTable = true;
      console.log("Users: ", this.users);
    },
    async createUser() {
      console.log("Name: ", this.name);
      console.log("Age: ", this.age);
      let response = await axios.post(API_URL + 'user',
        {
          name: this.name,
          age: this.age
        });
      console.log("Response: ", response);
    }
  }
};
</script>
