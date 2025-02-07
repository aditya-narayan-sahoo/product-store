import { sql } from "../config/db.js";

/**
 * Retrieves all products from the database, ordered by creation date in descending order.
 *
 * Sends a JSON response with the status code 200 and the list of products if successful.
 * If an error occurs, it logs the error and sends a JSON response with the status code 500.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getProducts = async (req, res) => {
  try {
    const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC`;

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error in getProducts controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Creates a new product in the database.
 *
 * If the request body is missing one or more of the required fields (name, image, price), it sends a JSON response with the status code 400.
 *
 * If the product is successfully created, it sends a JSON response with the status code 201 and the newly created product.
 *
 * If an error occurs, it logs the error and sends a JSON response with the status code 500.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const createProduct = async (req, res) => {
  const { name, image, price } = req.body;
  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }
  try {
    const newProduct = await sql`
            INSERT INTO products (name, image, price)
            VALUES (${name}, ${image}, ${price})
            RETURNING *`;

    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.error(`Error in createProduct controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Gets a product from the database.
 *
 * If the product with the given id does not exist, it sends a JSON response with the status code 404.
 *
 * If the product is successfully retrieved, it sends a JSON response with the status code 200 and the product.
 *
 * If an error occurs, it logs the error and sends a JSON response with the status code 500.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
        SELECT * FROM products WHERE id = ${id}
    `;
    if (product.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.error(`Error in getProduct controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Updates a product in the database.
 *
 * If the product with the given id does not exist, it sends a JSON response with the status code 404.
 *
 * If the product is successfully updated, it sends a JSON response with the status code 200 and the updated product.
 *
 * If an error occurs, it logs the error and sends a JSON response with the status code 500.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, price } = req.body;

  try {
    const updatedProduct = await sql`
        UPDATE products
        SET name = ${name}, image = ${image}, price = ${price}
        WHERE id = ${id}
        RETURNING *
    `;
    if (updatedProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct[0] });
  } catch (error) {
    console.error(`Error in updateProduct controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Deletes a product from the database.
 *
 * If the product with the given id does not exist, it sends a JSON response with the status code 404.
 *
 * If the product is successfully deleted, it sends a JSON response with the status code 200 and the deleted product.
 *
 * If an error occurs, it logs the error and sends a JSON response with the status code 500.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await sql`
        DELETE FROM products
        WHERE id = ${id}
        RETURNING *
    `;
    if (deletedProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.error(`Error in deleteProduct controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
