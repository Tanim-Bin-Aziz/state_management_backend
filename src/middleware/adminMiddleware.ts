import { Request, Response, NextFunction } from "express";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const user = (req as any).user;

  if (!user) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized, please login first." });
    return;
  }

  if (user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Access denied. Only Admin can perform this action.s",
    });
    return;
  }

  next();
};
