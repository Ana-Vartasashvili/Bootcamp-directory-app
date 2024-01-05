export const getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, message: "Show all bootcamps" });
};

export const getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Show bootcamp ${req.params.id}`,
  });
};

export const createBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Create new bootcamp`,
  });
};

export const updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Update bootcamp ${req.params.id}`,
  });
};

export const deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Delete bootcamp ${req.params.id}`,
  });
};
