<template>
  <b-row>
    <b-col sm="12">
      <b-card no-body class="my-4 mx-2">
        <b-card-header class="d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">Your profile</h4>
          </div>
        </b-card-header>
        <b-card-body>
          <form @submit.prevent="handleUpdateData">
            <div class="form-group">
              <div class="profile-img-edit position-relative">
                <img :src="userProfilePicUrl" alt="profile-pic" class="theme-color-default-img profile-pic rounded avatar-100" loading="lazy" />
                <div class="upload-icone bg-primary" @click="open({ accept: 'image/*', multiple: false })">
                  <svg class="upload-button" width="14" height="14" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                  </svg>
                </div>
              </div>
              <div class="img-extension mt-3">
                <div class="d-inline-block align-items-center">
                  <span>Only</span>
                  <span class="font-weight-bold"> .jpg, </span>
                  <span class="font-weight-bold"> .png </span>
                  <span class="font-weight-bold"> .jpeg </span>
                  <span>files are allowed</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="first-name" class="form-label">First Name</label>
              <input v-model="fName" type="text" class="form-control" id="first-name" placeholder=" " required />
            </div>
            <div class="form-group">
              <label for="last-name" class="form-label">Last Name</label>
              <input v-model="lName" type="text" class="form-control" id="last-name" placeholder=" " required />
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input v-model="emailAddress" type="email" class="form-control" id="email" placeholder=" " required />
            </div>
            <div class="form-group">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input v-model="phoneNumber" type="text" class="form-control" id="phoneNumber" placeholder=" " pattern="^[89]\d{7}$" required />
            </div>
            <div class="form-group">
              <label for="password" class="form-label">Current Password</label>
              <input v-model="password" type="password" class="form-control" id="password" required />
            </div>
            <hr />
            <h4>Change Password</h4>
            <div class="form-group">
              <label for="new-password" class="form-label">New Password</label>
              <input v-model="newPassword" type="password" class="form-control" id="new-password" />
            </div>
            <div class="form-group">
              <label for="confirm-new-password" class="form-label">Confirm New Password</label>
              <input v-model="cfmNewPassword" type="password" class="form-control" id="confirm-new-password" />
            </div>
            <button type="submit" class="btn btn-primary">Update Profile</button>
            <button type="button" class="btn btn-secondary" @click="handleReset">Reset Changes</button>
            <button type="button" class="btn btn-danger" @click="handleDelete">Delete Acccount</button>
          </form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>
<script setup>
import { updateProfile, updateEmail, signInWithEmailAndPassword, updatePassword, signOut, deleteUser } from 'firebase/auth'
import { ref as dbRef, onValue, update, remove } from 'firebase/database'
import { useFirebaseAuth, useDatabase, useFirebaseStorage } from 'vuefire'
import { ref as storageRef, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { ref, watch } from 'vue'
import router from '@/router'
import { toast } from 'vue3-toastify'
import { useFileDialog } from '@vueuse/core'

const auth = useFirebaseAuth()
var fName = ref('')
var lName = ref('')
var emailAddress = ref('')
const password = ref('')
const newPassword = ref('')
const cfmNewPassword = ref('')
var phoneNumber = ref('')
const db = useDatabase()
const storage = useFirebaseStorage()
const { files, open, reset } = useFileDialog()
var extendedUserData = null
var userProfilePicUrl = ref('')
var photoPath = ref('')

const handleReset = () => {
  onValue(
    dbRef(db, '/users/' + auth.currentUser.uid),
    (snapshot) => {
      console.log(snapshot.val())
      extendedUserData = snapshot.val()
      fName.value = snapshot.val().firstName
      lName.value = snapshot.val().lastName
      emailAddress.value = auth.currentUser.email
      phoneNumber.value = snapshot.val().phoneNumber
      photoPath.value = snapshot.val().photoPath
      getDownloadURL(storageRef(storage, photoPath.value))
        .then((url) => {
          console.log(url)
          userProfilePicUrl.value = url
          console.log(userProfilePicUrl)
        })
        .catch((error) => {
          console.log(error)
        })
      console.log(extendedUserData)
    },
    {
      onlyOnce: true
    }
  )
}

handleReset()

watch(files, (newFile) => {
  console.log(newFile)
  console.log(newFile[0])
  if (newFile.length == 1) {
    let newPhotoFileRef = storageRef(storage, 'user-profile-pictures/' + auth.currentUser.uid + '/' + newFile[0].name)
    uploadBytes(newPhotoFileRef, newFile[0])
      .then((snapshot) => {
        console.log(snapshot)
        if (photoPath.value != 'user-profile-pictures/generic.jpg') {
          deleteObject(storageRef(storage, photoPath.value))
        }
        getDownloadURL(newPhotoFileRef)
          .then((url) => {
            console.log(url)
            userProfilePicUrl.value = url
            console.log(userProfilePicUrl)
          })
          .catch((error) => {
            console.log(error)
          })
        update(dbRef(db, 'users/' + auth.currentUser.uid), {
          photoPath: 'user-profile-pictures/' + auth.currentUser.uid + '/' + newFile[0].name,
          updatedTimestamp: Date.now()
        }).then(() => {
          photoPath.value = 'user-profile-pictures/' + auth.currentUser.uid + '/' + newFile[0].name
          toast('Profile Picture Changed Successfully', {
            autoClose: 5000,
            type: 'success'
          })
          setTimeout(() => {
            router.go(0)
          }, 6000)
        })
      })
      .catch((error) => {
        console.log(error)
        reset()
      })
  }
})

const handleUpdateData = () => {
  signInWithEmailAndPassword(auth, auth.currentUser.email, password.value)
    .then((userCredential) => {
      if (userCredential.user.email != emailAddress.value) {
        updateEmail(userCredential.user, emailAddress.value)
          .then(() => {
            toast('Email Changed Successfully', {
              autoClose: 5000,
              type: 'success'
            })
            update(dbRef(db, 'users/' + userCredential.user.uid), {
              emailAddress: emailAddress.value,
              updatedTimestamp: Date.now()
            })
            password.value = ''
            newPassword.value = ''
            cfmNewPassword.value = ''
          })
          .catch((error) => {
            let errorMessage = ''
            switch (error.code) {
              case 'auth/invalid-email':
                errorMessage = 'Invalid email address'
                break
              default:
                errorMessage = 'An error occurred'
                break
            }
            console.log(error.code, error.message)
            toast(errorMessage, {
              autoClose: 5000,
              type: 'error'
            })
            password.value = ''
            newPassword.value = ''
            cfmNewPassword.value = ''
          })
      }
      if (newPassword.value == cfmNewPassword.value && newPassword.value != '') {
        updatePassword(userCredential.user, newPassword.value)
          .then(() => {
            toast('Password Changed Successfully', {
              autoClose: 5000,
              type: 'success'
            })
            password.value = ''
            newPassword.value = ''
            cfmNewPassword.value = ''
          })
          .catch((error) => {
            let errorMessage = ''
            switch (error.code) {
              case 'auth/invalid-email':
                errorMessage = 'Invalid email address'
                break
              default:
                errorMessage = 'An error occurred'
                break
            }
            console.log(error.code, error.message)
            toast(errorMessage, {
              autoClose: 5000,
              type: 'error'
            })
            password.value = ''
            newPassword.value = ''
            cfmNewPassword.value = ''
          })
      }
      if (fName.value !== extendedUserData.firstName || lName.value !== extendedUserData.lastName || phoneNumber.value !== extendedUserData.phoneNumber) {
        updateProfile(userCredential.user, { displayName: fName.value + ' ' + lName.value })
        update(dbRef(db, 'users/' + userCredential.user.uid), {
          firstName: fName.value,
          lastName: lName.value,
          phoneNumber: phoneNumber.value,
          updatedTimestamp: Date.now()
        })
          .then(() => {
            toast('Profile Details Updated Successfully', {
              autoClose: 5000,
              type: 'success'
            })
            password.value = ''
            newPassword.value = ''
            cfmNewPassword.value = ''
          })
          .catch((error) => {
            let errorMessage = ''
            switch (error.code) {
              case 'auth/invalid-email':
                errorMessage = 'Invalid email address'
                break
              default:
                errorMessage = 'An error occurred'
                break
            }
            console.log(error.code, error.message)
            toast(errorMessage, {
              autoClose: 5000,
              type: 'error'
            })
            password.value = ''
            newPassword.value = ''
            cfmNewPassword.value = ''
          })
      }
    })
    .catch((error) => {
      let errorMessage = ''
      switch (error.code) {
        case 'auth/invalid-login-credentials':
          errorMessage = 'Invalid credentials'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/user-disabled':
          errorMessage = 'User account disabled'
          break
        case 'auth/user-not-found':
          errorMessage = 'User not found'
          break
        case 'auth/wrong-password':
          errorMessage = 'Invalid password'
          break
        default:
          errorMessage = 'An error occurred'
          break
      }
      console.log(error.code, error.message)
      toast(errorMessage, {
        autoClose: 5000,
        type: 'error'
      })
      password.value = ''
      newPassword.value = ''
      cfmNewPassword.value = ''
      if (error.code === 'auth/user-not-found' || error.code === 'auth/user-disabled') {
        signOut(auth)
        setTimeout(() => {
          router.push({ name: 'auth.login', query: { redirect: router.currentRoute.value.fullPath } })
        }, 6000)
      }
    })
}

const handleDelete = () => {
  if (password.value == '') {
    toast('Please enter your current password to delete your account', {
      autoClose: 5000,
      type: 'error'
    })
    return
  } else {
    signInWithEmailAndPassword(auth, auth.currentUser.email, password.value)
      .then((userCredential) => {
        remove(dbRef(db, 'users/' + auth.currentUser.uid))
        if (photoPath.value != 'user-profile-pictures/generic.jpg') {
          deleteObject(storageRef(storage, photoPath.value))
        }
        deleteUser(userCredential.user).then(() => {
          toast('Account Deleted Successfully', {
            autoClose: 5000,
            type: 'success'
          })
          setTimeout(() => {
            router.push({ name: 'auth.login', query: { redirect: router.currentRoute.value.fullPath } })
          }, 6000)
        })
      })
      .catch((error) => {
        let errorMessage = ''
        switch (error.code) {
          case 'auth/invalid-login-credentials':
            errorMessage = 'Invalid credentials'
            break
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address'
            break
          case 'auth/user-disabled':
            errorMessage = 'User account disabled'
            break
          case 'auth/user-not-found':
            errorMessage = 'User not found'
            break
          case 'auth/wrong-password':
            errorMessage = 'Invalid password'
            break
          default:
            errorMessage = 'An error occurred'
            break
        }
        console.log(error.code, error.message)
        toast(errorMessage, {
          autoClose: 5000,
          type: 'error'
        })
        password.value = ''
        if (error.code === 'auth/user-not-found' || error.code === 'auth/user-disabled') {
          signOut(auth)
          setTimeout(() => {
            router.push({ name: 'auth.login' })
          }, 6000)
        }
      })
  }
}

toast.clearAll()
</script>
