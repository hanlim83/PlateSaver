<script setup>
import { ref as dbRef, onValue, update } from 'firebase/database'
import { useFirebaseAuth, useDatabase, useFirebaseStorage } from 'vuefire'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { ref } from 'vue'
import router from '@/router'

const auth = useFirebaseAuth()
const db = useDatabase()
const storage = useFirebaseStorage()
import { toast } from 'vue3-toastify'
const tableData = ref([])

onValue(dbRef(db, '/users'), (snapshot) => {
  tableData.value = []
  snapshot.forEach((childSnapshot) => {
    console.log(childSnapshot.val())
    if (childSnapshot.val().id == auth.currentUser.uid && childSnapshot.val().role != 'admin') {
      router.push({ name: 'not-found' })
    }
    getDownloadURL(storageRef(storage, childSnapshot.val().photoPath))
      .then((url) => {
        console.log(url)
        tableData.value.push({
          id: childSnapshot.val().id,
          image: url,
          name: childSnapshot.val().firstName + ' ' + childSnapshot.val().lastName,
          contact: childSnapshot.val().phoneNumber,
          email: childSnapshot.val().emailAddress,
          date: childSnapshot.val().createdTimestamp,
          role: childSnapshot.val().role
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })
})

const handleUpdateRole = (id, role) => {
  console.log(id)
  console.log(role)
  update(dbRef(db, '/users/' + id), {
    role: role
  })
    .then(() => {
      toast('Role updated successfully', {
        autoClose: 5000,
        type: 'success'
      })
    })
    .catch((error) => {
      console.log(error)
      toast('Error updating role', {
        autoClose: 5000,
        type: 'success'
      })
    })
}

toast.clearAll()
</script>
<template>
  <b-row>
    <b-col sm="12">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">User List</h4>
          </div>
        </div>
        <div class="card-body px-0">
          <div class="table-responsive">
            <table id="user-list-table" class="table table-striped" role="grid" data-toggle="data-table">
              <thead>
                <tr class="light">
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th style="min-width: 100px">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in tableData" :key="index">
                  <td class="text-center"><img class="bg-soft-primary rounded img-fluid avatar-40 me-3" :src="user.image" alt="profile" loading="lazy" /></td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.contact }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                  <td v-if="user.id != auth.currentUser.uid">
                    <div class="flex align-items-center list-user-action">
                      <a v-if="user.role == 'user'" class="btn btn-sm btn-icon btn-success mx-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Change Role" href="#" @click="handleUpdateRole(user.id, 'admin')">
                        <span class="btn-inner">
                          <icon-component type="outlined" icon-name="pencil-alt" />
                        </span>
                      </a>
                      <a v-else-if="user.role == 'admin'" class="btn btn-sm btn-icon btn-success mx-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Change Role" href="#" @click="handleUpdateRole(user.id, 'user')">
                        <span class="btn-inner">
                          <icon-component type="outlined" icon-name="pencil-alt" />
                        </span>
                      </a>
                    </div>
                  </td>
                  <td v-else></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>
