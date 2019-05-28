import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Input, SubmitButton } from "../../../core_containers"
import validateInput from "../../../utils/validation/validation"
import { login } from "../../actions/index"
import "../css/login.css"
import { hasToken } from "../../utils"
import { TOKEN_TYPE } from "../../constants/index"

class LoginIndex extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
			errors: ""
		}
	}
	componentDidMount() {
		if (hasToken(TOKEN_TYPE)) {
			this.props.history.push("/student/")
		}
	}
	onChange = e => {
		const name = e.target.name
		let value = e.target.value
		this.setState({
			[name]: value,
			errors: ""
		})
	}

	handleSubmit = e => {
		e.preventDefault()
		let { username, password } = this.state
		if (username) {
			username = username.trim()
		}
		if (password) {
			password = password.trim()
		}
		const checkPass = validateInput(password, "password")
		if (checkPass.isValid) {
			this.props.login(username, password, this.callback)
		} else {
			this.setState({
				errors: checkPass.errors.password
			})
		}
	}
	callback = () => {
		this.props.history.push("/student/")
	}
	render() {
		const { username, password, errors } = this.state
		return (
			<div className="login">
				<div className="loginInput">
					<span className="login-error-text" style={{}}>
						{errors}
					</span>
					<div className="heading">Welcome to DELTA</div>
					<div className="subheading">
						An online opportunity portal for students of IIT-R
					</div>
					<form onSubmit={this.handleSubmit}>
						<Input
							type="text"
							placeholder="Email ID"
							className="loginField"
							name="username"
							value={username}
							onChange={this.onChange}
						/>
						<br />
						<Input
							type="password"
							placeholder="Password"
							className="loginField"
							name="password"
							value={password}
							onChange={this.onChange}
						/>
						<div className="forgotPassword">
							<Link to="#">Forgot Password?</Link>
						</div>
						<SubmitButton buttonContent="Log in" className="loginSubmit" />
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.studentReducer.login
	}
}

const mapActionToProps = dispatch => {
	return {
		login: (username, password, callback) => {
			return dispatch(login(username, password, callback))
		}
	}
}

export default connect(
	mapStateToProps,
	mapActionToProps
)(LoginIndex)
