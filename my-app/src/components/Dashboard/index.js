import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function Dashboard(props) {
	const { classes } = props
	const [city, setCity] = useState('')
	const [blood, setBlood] = useState('')
	const [age, setAge] = useState('')
	const [dob, setDob] = useState('')

	var username = null

	if(firebase.getCurrentUsername()){
		username = firebase.getCurrentUsername();
	}

	useEffect(() => {
	if(firebase.getCurrentUsername()) {
		firebase.getCurrentUserCity().then(setCity)
	}
	}, [username])
	
	useEffect(() => {
		if(firebase.getCurrentUsername()) {
			firebase.getCurrentUserBlood().then(setBlood)
		}
		}, [username])
	
	useEffect(() => {
		if(firebase.getCurrentUsername()) {
			firebase.getCurrentUserAge().then(setAge)
		}
		}, [username])

	useEffect(() => {
		if(firebase.getCurrentUsername()) {
			firebase.getCurrentUserDob().then(setDob)
		}
		}, [username])

	if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
	}


	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Hello { firebase.getCurrentUsername() }
				</Typography>
				<Typography component="h1" variant="h5">
					Your city: {city ? `${city}` : <CircularProgress size={20} />}
				</Typography>
				<Typography component="h1" variant="h5">
					Your blood: {blood ? `${blood}` : <CircularProgress size={20} />}
				</Typography>
				<Typography component="h1" variant="h5">
					Your age: {age ? `${age}` : <CircularProgress size={20} />}
				</Typography>
				<Typography component="h1" variant="h5">
					Your DOB: {dob ? `${dob}` : <CircularProgress size={20} />}
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={logout}
					className={classes.submit}>
					Logout
          		</Button>
			</Paper>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Dashboard))