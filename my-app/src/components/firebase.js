import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyCExK7EEQ55DIpdvYnG26JDzpFezdD2S9A",
    authDomain: "my-app-7b0a0.firebaseapp.com",
    databaseURL: "https://my-app-7b0a0.firebaseio.com",
    projectId: "my-app-7b0a0",
    storageBucket: "my-app-7b0a0.appspot.com",
    messagingSenderId: "687464389321",
    appId: "1:687464389321:web:2043273e962b8ced414b18",
    measurementId: "G-JLZPCM2D5B"
}



class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	
	addFields(blood, city, age, dob) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}
		console.log('yes');
		return this.db.collection('users').doc(this.auth.currentUser.uid).set({
			blood, city, age, dob
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserCity() {
		const city = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return city.get('city')
	}
	
	async getCurrentUserBlood() {
		const city = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return city.get('blood')
	}

	async getCurrentUserAge() {
		const city = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return city.get('age')
	}
	
	async getCurrentUserDob() {
		const city = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		console.log(city.get('dob'))
		return city.get('dob')
	}
}

export default new Firebase()