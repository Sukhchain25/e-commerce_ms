import { Request, Response } from 'express';
import Product from '../models';
import logger from '../shared/logger';

const controller = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const productData = req.body;
      const product = await Product.create(productData);
      logger.info('Product created');
      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
      });
    } catch (err: any) {
      logger.error(err.message || err);
      return res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        data: [],
      });
    }
  },
  updateProductById: async (req: Request, res: Response) => {
    try {
      const reqData = req.body;
      const productId = req.params.id;
      const updateProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: reqData },
        { new: true }
      );
      logger.info('Product updated');
      return res.status(200).json({
        success: true,
        message: 'Updated successfully',
        data: updateProduct,
      });
    } catch (err: any) {
      logger.error(err.message || err);
      return res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  },
  fetchAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      if (products?.length) {
        return res.status(200).json({
          success: true,
          message: 'Products fetched successfully',
          data: products,
        });
      } else logger.error('Product not found');
      return res.status(404).json({
        success: false,
        message: 'No products found',
        data: [],
      });
    } catch (err: any) {
      logger.error(err.message || err);
      return res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  },
  deleteAllProducts: async (_req: Request, res: Response) => {
    try {
      const deleted = await Product.deleteMany();
      if (deleted.acknowledged === true) {
        logger.info('Products deleted');
        return res.status(200).json({
          success: true,
          message: 'Deletion successful',
          data: deleted.deletedCount,
        });
      } else
        return res.status(500).json({
          success: false,
          message: 'Something went wrong',
          data: [],
        });
    } catch (err: any) {
      logger.error(err.message || err);
      return res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  },
  deleteProductById: async (req: Request, res: Response) => {
    try {
      const id = req.query.productId;
      const result = await Product.findByIdAndDelete(id);
      if (result === null) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
          data: [],
        });
      } else
        return res.status(200).json({
          success: true,
          message: 'Product deleted successfully',
          data: { deletedProduct: result },
        });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  },
};

export default controller;
