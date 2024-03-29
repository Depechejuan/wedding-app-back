"use strict";

module.exports = {
    genericError() {
        return {
            success: false,
            status: 500,
            code: "SOMETHING_WENT_WRONG",
            message: "Something Went Wrong",
        };
    },

    dataInvalid() {
        return {
            success: false,
            status: 400,
            code: "DATA_INVALID",
            message: "The data you provide isn't valid",
        };
    },

    invalidCredentials() {
        return {
            success: false,
            status: 400,
            code: "INVALID_CREDENTIALS",
            message: "You must enter a valid email and password",
        };
    },

    emailAlreadyRegistered() {
        return {
            success: false,
            status: 400,
            code: "EMAIL_ALREADY_REGISTERED",
            message: "This email has already been registered",
        };
    },

    didNotAcceptedTOS() {
        return {
            success: false,
            status: 403,
            code: "DID_NOT_ACCEPT_TOS",
            message: "User must accept terms and services to register",
        };
    },

    notAuth() {
        return {
            success: false,
            status: 401,
            code: "NOT_AUTHENTICATED",
            message: "User not authenticated. Token missing",
        };
    },

    unauthorized() {
        return {
            success: false,
            status: 403,
            code: "UNAUTHORIZED",
            message: "User not authorized to do this action",
        };
    },

    notFound() {
        return {
            success: false,
            status: 404,
            code: "NOT_FOUND",
            message: "Looks like this doesn't exists...",
        };
    },

    partnerNotRegistered() {
        return {
            success: false,
            status: 422,
            code: "PARTNER_NOT_REGISTERED",
            message:
                "The user you invited is not registered. We sent an email to initialize the registration form. Try again when it's done!",
        };
    },

    weddingAlreadyCreated() {
        return {
            success: false,
            status: 409,
            code: "RESOURCE_CONFLICT",
            message: "This resource already exists",
        };
    },

    savePhotoError() {
        return {
            success: false,
            status: 417,
            code: "PHOTO_ERROR",
            message: "The server couldn't process the request properly.",
        };
    },

    samePassword() {
        return {
            success: false,
            status: 304,
            code: "SAME_PASSWORD",
            message:
                "You can't change the password if you enter the old one. Please create a new password.",
        };
    },
};
