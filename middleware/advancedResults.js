export const advancedResults = (model, populate) => async (req, res, next) => {
  let query

  const reqQuery = { ...req.query }

  const removeFields = ['select', 'sort', 'limit', 'page']
  removeFields.forEach((param) => delete reqQuery[param])

  let queryStr = JSON.stringify(reqQuery)
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, (match) => `$${match}`)
  query = model.find(JSON.parse(queryStr))

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  const page = +req.query.page || 1
  const limit = +req.query.limit || 100
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await model.countDocuments()

  query = query.skip(startIndex).limit(limit)

  if (populate) {
    query = query.populate(populate)
  }

  const results = await query

  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  res.advancedResults = {
    success: true,
    count: total,
    pagination,
    data: results,
  }

  next()
}
