import { Request, Response } from "express";
import { InvitationService } from "./invitation.service";

export const InvitationController = {
  // ✅ GET all
  getAll: (req: Request, res: Response) => {
    const data = InvitationService.getAllInvitations();

    res.status(200).json({
      success: true,
      message: "Invitations fetched successfully",
      data,
    });
  },

  // ✅ GET by id
  getById: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = InvitationService.getInvitationById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  },

  // ✅ POST (create from Postman)
  create: (req: Request, res: Response) => {
    const payload = req.body;

    if (!payload || !payload.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    const data = InvitationService.createInvitation(payload);

    res.status(201).json({
      success: true,
      message: "Invitation created successfully",
      data,
    });
  },

  // ✅ PATCH (update status)
  updateStatus: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { status } = req.body;

    const data = InvitationService.updateStatus(id, status);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data,
    });
  },

  // ✅ DELETE
  delete: (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const data = InvitationService.deleteInvitation(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
      data,
    });
  },
};