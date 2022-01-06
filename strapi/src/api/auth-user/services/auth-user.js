'use strict';

/**
 * auth-user service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::auth-user.auth-user');
