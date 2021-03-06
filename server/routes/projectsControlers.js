const asyncLib = require('async')
const models = require('../models')
const jwtUtils = require('../utility/jwt.utility')

module.exports = {
  async list(req, res) {
    const projects = await models.Project.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'demo',
        'repository',
        'imageLink'
      ]
    }).catch(() => {
      return res.status(500).json({ error: 'cannot get projects' })
    })
    return res.status(200).json({ projects })
  },

  create(req, res) {
    // Authorization check.
    const headerAuth = req.headers.authorization
    const userId = jwtUtils.getUserId(headerAuth)

    if (userId < 0) {
      return res.status(400).json({ error: 'wrong token' })
    }
    // Get fields.
    const title = req.body.title
    const repository = req.body.repository
    const demo = req.body.demo
    const imageLink = req.body.imageLink
    const description = req.body.description

    // Verify fields
    if (title === null || imageLink === null) {
      return res.status(400).json({ error: 'missing parameters' })
    }

    asyncLib.waterfall([
      (done) => {
        models.User.findOne({
          attributes: ['email'],
          where: { id: userId }
        })
          .then((userFound) => {
            done(null, userFound)
          })
          .catch(() => {
            res.status(500).json({ error: 'unable to verify user' })
          })
      },
      (userFound, done) => {
        if (userFound.email === 'da-max@tutanota.com') {
          done(null)
        } else {
          return res.status(500).json({ error: 'access unauthorized' })
        }
      },
      (done) => {
        models.Project.findOne({
          attributes: ['title'],
          where: { title }
        })
          .then((project) => {
            done(null, project)
          })
          .catch(() => {
            return res.status(500).json({ error: 'unable to verify project' })
          })
      },
      (project, done) => {
        if (!project) {
          models.Project.create({
            title,
            repository,
            demo,
            imageLink,
            description
          })
            .then((newProject) => {
              done(null, newProject)
            })
            .catch(() => {
              return res.status(500).json({ error: 'cannot add project' })
            })
        } else {
          return res.status(500).json({ error: 'unable to verify project' })
        }
      },
      (newProject) => {
        if (newProject) {
          return res.status(201).json({ projectTitle: newProject.title })
        } else {
          return res.status(500).json({ error: 'cannot add project' })
        }
      }
    ])
  },

  retrieve(req, res) {
    const headerAuth = req.headers.authorization
    const userId = jwtUtils.getUserId(headerAuth)

    if (userId < 0) {
      return res.status(400).json({ error: 'wrong token' })
    }

    const projectId = req.params.id

    asyncLib.waterfall([
      (done) => {
        models.User.findOne({
          attributes: ['email'],
          where: { id: userId }
        })
          .then((userFound) => {
            done(null, userFound)
          })
          .catch(() => {
            return res.status(500).json({ error: 'unable to verfy user' })
          })
      },
      (userFound, done) => {
        if (userFound.email === 'da-max@tutanota.com') {
          done(null)
        } else {
          return res.status(500).json({ error: 'access unauthorized' })
        }
      },
      (done) => {
        models.Project.findOne({
          attributes: [
            'id',
            'title',
            'imageLink',
            'repository',
            'demo',
            'description'
          ],
          where: { id: projectId }
        })
          .then((projectFound) => {
            done(null, projectFound)
          })
          .catch(() => {
            return res.status(403).json({ error: 'project not found' })
          })
      },
      (projectFound) => {
        if (projectFound) {
          return res.status(200).json(projectFound)
        } else {
          return res.status(403).json({ error: 'project not found' })
        }
      }
    ])
  },

  update(req, res) {
    const headerAuth = req.headers.authorization
    const userId = jwtUtils.getUserId(headerAuth)

    if (userId < 0) {
      return res.status(400).json({ error: 'wrong token' })
    }

    const projectId = req.params.id

    const title = req.body.title
    const demo = req.body.demo
    const repository = req.body.repository
    const imageLink = req.body.imageLink
    const description = req.body.description

    asyncLib.waterfall([
      (done) => {
        models.User.findOne({
          attributes: ['email'],
          where: { id: userId }
        })
          .then((userFound) => {
            done(null, userFound)
          })
          .catch(() => {
            return res.status(500).json({ error: 'unable to verfy user' })
          })
      },
      (userFound, done) => {
        if (userFound.email === 'da-max@tutanota.com') {
          done(null)
        } else {
          return res.status(500).json({ error: 'access unauthorized' })
        }
      },
      (done) => {
        models.Project.findOne({
          attributes: [
            'id',
            'title',
            'imageLink',
            'repository',
            'demo',
            'description'
          ],
          where: { id: projectId }
        })
          .then((projectFound) => {
            done(null, projectFound)
          })
          .catch((err) => {
            console.log(err)
            return res.status(403).json({ error: 'project not found' })
          })
      },
      (projectFound, done) => {
        if (projectFound) {
          projectFound
            .update({
              title: !title ? projectFound.title : title,
              imageLink: !imageLink ? projectFound.imageLink : imageLink,
              repository: !repository ? projectFound.repository : repository,
              demo: !demo ? projectFound.demo : demo,
              description: !description ? projectFound.description : description
            })
            .then(() => {
              done(null, projectFound)
            })
            .catch(() => {
              res.status(500).json({ error: 'cannot update user' })
            })
        } else {
          return res.status(403).json({ error: 'project not found' })
        }
      },
      (projectFound) => {
        if (projectFound) {
          return res.status(201).json({ error: 'cannot update project' })
        }
      }
    ])
  },

  delete(req, res) {
    // Check if user is login.
    const headerAuth = req.headers.authorization
    const userId = jwtUtils.getUserId(headerAuth)

    if (userId < 0) {
      return res.status(400).json({ error: 'wrong token' })
    }

    const projectId = req.params.id

    asyncLib.waterfall([
      (done) => {
        models.User.findOne({
          attributes: ['email'],
          where: { id: userId }
        })
          .then((userFound) => {
            done(null, userFound)
          })
          .catch((err) => {
            console.log(err)
            return res.status(500).json({ error: 'unable to verify user' })
          })
      },
      (userFound, done) => {
        if (userFound.email === 'da-max@tutanota.com') {
          done(null)
        } else {
          return res.status(500).json({ error: 'access unauthorized' })
        }
      },
      (done) => {
        models.Project.destroy({
          where: { id: projectId }
        })
          .then((project) => {
            done(null, project)
          })
          .catch(() => {
            return res.status(500).json({ error: 'cannot delete project' })
          })
      },
      (project) => {
        if (project) {
          return res.status(201).json({ status: 'project delete' })
        } else {
          return res.status(500).json({ error: 'cannot delete project' })
        }
      }
    ])
  }
}
