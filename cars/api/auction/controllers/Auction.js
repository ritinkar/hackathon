"use strict";

/**
 * Auction.js controller
 *
 * @description: A set of functions called "actions" for managing `Auction`.
 */

module.exports = {
  /**
   * Retrieve auction records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.services.auction.search(ctx.query);
    } else {
      return strapi.services.auction.fetchAll(ctx.query);
    }
  },

  findlive: async ctx => {
    let auctions = await strapi.services.auction.fetchAll(ctx.query);
    return auctions.filter(
      auction =>
        auction.start < Date.now() &&
        auction.start + auction.duration > Date.now()
    );
  },

  /**
   * Retrieve a auction record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.auction.fetch(ctx.params);
  },

  /**
   * Count auction records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.auction.count(ctx.query);
  },

  /**
   * Create a/an auction record.
   *
   * @return {Object}
   */

  create: async ctx => {
    return strapi.services.auction.add(ctx.request.body);
  },

  /**
   * Update a/an auction record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.auction.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an auction record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.auction.remove(ctx.params);
  }
};
