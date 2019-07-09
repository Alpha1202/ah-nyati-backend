import { User } from '../db/models';

/**
 * @description This class handles user requests
 * @class UserController
 */
class UserController {
  /**
   * @static
   * @description this function gets all registered users
   * @param {object} req the request body
   * @param {object} res the response body
   * @returns {object} res
   * @memberof UserController
   */
  static async getUserProfile(req, res) {
    const { userName } = req.params;

    try {
      const userData = await User.findOne({
        attributes: ['firstName', 'lastName', 'userName',
          'email', 'bio', 'imageUrl'],
        where: { userName },
      });

      if (!userData) {
        return res.status(404).json({
          status: 404,
          error: 'User not found',
        });
      }

      return res.status(200).json({
        status: 200,
        users: userData,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
     *@static
     *@description this function creates and updates user profile
     * @param {object} req the request body
     * @param {object} res the response body
     * @returns {object} res
     * @memberof UserController
     */
  static async updateProfile(req, res) {
    try {
      const {
        firstName, lastName, userName, bio,
      } = req.body;

      const avatar = req.file;
      const userId = req.user;
      let { id } = req.params;
      id = Number(id);

      let avatarValue;

      if (avatar) avatarValue = avatar.url;

      const userDetails = {
        firstName,
        lastName,
        userName,
        bio,
        imageUrl: avatarValue,
      };

      const where = {
        id,
      };

      const attributes = ['id', 'firstName', 'lastName', 'userName', 'bio', 'imageUrl'];

      const userData = await User.findOne({ attributes, where });

      if (id === userId) {
        await userData.update(userDetails, { where });

        return res.status(200).json({
          status: 200,
          user: userDetails,
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'You do not have permission to perform that operation',
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 400,
          error: 'User with that username already exists',
        });
      }
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default UserController;
