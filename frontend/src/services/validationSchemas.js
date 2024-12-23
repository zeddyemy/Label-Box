import * as Yup from "yup";

export const resetPwdSchema = Yup.object().shape({
	new_password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("new_password"), null], "Passwords must match")
		.required("Confirm Password is required"),
	reset_token: Yup.string().required("reset token is required"),
});

export const emailSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
});

export const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
});

export const signupSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	firstname: Yup.string().required("First name is required"),
	lastname: Yup.string().required("Last name is required"),
	country: Yup.string().required("Country is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password is required"),
});



export const profileEditSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	firstname: Yup.string().required("First name is required"),
	lastname: Yup.string().required("Last name is required"),
	country: Yup.string().required("Country is required"),
	phone: Yup.string().nullable(),
	gender: Yup.string().required("Gender is required"),
	profile_picture: Yup.string().url("Invalid URL").nullable(),
});


export const newProjectSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	description: Yup.string().nullable(),
});

export const newExpenseSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	amount: Yup.number().required("Amount is required"),
});
