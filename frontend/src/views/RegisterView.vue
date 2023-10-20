<template>
  <div class="create-user">
      <div class = "col-md-2"></div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
            <div class="card-body">
              
              <h2 class="mb-2 text-center">Sign Up</h2>
              <p class="text-center">Create your <brand-name></brand-name> account.</p>
              <form>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="full-name" class="form-label">First Name</label>
                      <input type="text" class="form-control" id="name" v-model="name" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="last-name" class="form-label">Last Name</label>
                      <input type="text" class="form-control" id="nameLast" v-model="nameLast" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="birthday">Birthday:</label>
                      <input type="date" class="form-control" id="birthday" v-model="birthday">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="last-name" class="form-label">Username</label>
                      <input type="text" class="form-control" id="userName" v-model="userName" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" class="form-control" id="email" v-model="email" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="phone" class="form-label">Phone No.</label>
                      <input type="text" class="form-control" id="phone" v-model="phone" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="password" class="form-label">Password</label>
                      <input type="password" class="form-control" id="password" v-model="password" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="confirmPassword" class="form-label">Password</label>
                      <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" />
                    </div>
                  </div>
                  <div class="col-lg-12 d-flex justify-content-center">
                    <div class="form-check mb-3">
                      <input type="checkbox" class="form-check-input" id="customCheck1" />
                      <label class="form-check-label" for="customCheck1">I agree with the terms of use</label>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary" @click="createUser()">Sign Up</button>
                </div>

                <br />
                <div class="d-flex justify-content-center">
                  <button type="button" class="btn btn-primary" @click="getUsers()">Get Users</button>
                </div>                 
                <p class="text-center my-3">or sign in with other accounts?</p>
                <div class="d-flex justify-content-center">
                  <ul class="list-group list-group-horizontal list-group-flush">
                    <li class="list-group-item border-0 pb-0">
                      <a href="#"><img src="@/assets/images/brands/fb.svg" alt="fb" loading="lazy" /></a>
                    </li>
                    <li class="list-group-item border-0 pb-0">
                      <a href="#"><img src="@/assets/images/brands/gm.svg" alt="gm" loading="lazy" /></a>
                    </li>
                    <li class="list-group-item border-0 pb-0">
                      <a href="#"><img src="@/assets/images/brands/im.svg" alt="im" loading="lazy" /></a>
                    </li>
                    <li class="list-group-item border-0 pb-0">
                      <a href="#"><img src="@/assets/images/brands/li.svg" alt="li" loading="lazy" /></a>
                    </li>
                  </ul>
                </div>
                <p class="mt-3 text-center">Already have an Account <a href="/auth/login" class="text-underline">Sign In</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <table v-if="canViewTable" class="table">
            <thead>
              <th>Name</th>
              <th>Birthday</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Password</th>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <th scope="col">{{ user.name + "" + user.nameLast }}</th>
                <th scope="col">{{ user.birthday}}</th>
                <th scope="col">{{ user.userName }}</th>
                <th scope="col">{{ user.email}}</th>
                <th scope="col">{{ user.phone}}</th>
                <th scope="col">{{ user.confirmPassword }}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

  </div>

</template>

<script>
const API_URL = "http://localhost:4000/";
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      nameLast : "",
      birthday : "", 
      userName: "",
      email: "",
      phone : "",
      confirmPassword : "",
      users: [],
      canViewTable: false,
    };
  },
  components: {},
  methods: {
    async getUsers() {
      let response = await axios.get(API_URL + "users");
      this.users = response.data.data;
      this.canViewTable = true;
      console.log("Users: ", this.users);
    },
    async createUser() {
      console.log("Name: ", this.name);
      console.log("Age: ", this.age);
      let response = await axios.post(API_URL + "user", {
        name: this.name,
        nameLast : this.nameLast,
        birthday : this.birthday,
        userName : this.userName,
        email : this.email,
        phone : this.phone,
        confirmPassword : this.confirmPassword

      });
      console.log("Response: ", response);
    },
  },
};
</script>
