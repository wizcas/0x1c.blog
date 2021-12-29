'use strict';

/**
 *  auth-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::auth-user.auth-user');
