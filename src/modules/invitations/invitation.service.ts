type InvitationStatus = "pending" | "accepted" | "rejected";

interface Event {
  id: number;
  title: string;
  date: string;
  organizer: { name: string };
  fee: number;
  isPublic: boolean;
}

interface Invitation {
  id: number;
  status: InvitationStatus;
  event: Event;
}

// ✅ EMPTY STORAGE (no dummy data)
const invitations: Invitation[] = [];

export const InvitationService = {
  // ✅ GET all
  getAllInvitations: () => {
    return invitations;
  },

  // ✅ GET by id
  getInvitationById: (id: number) => {
    return invitations.find((inv) => inv.id === id);
  },

  // ✅ CREATE (from Postman)
  createInvitation: (payload: Invitation) => {
    invitations.push(payload);
    return payload;
  },

  // ✅ UPDATE status
  updateStatus: (id: number, status: InvitationStatus) => {
    const invitation = invitations.find((inv) => inv.id === id);

    if (!invitation) return null;

    invitation.status = status;
    return invitation;
  },

  // ✅ DELETE (optional but useful)
  deleteInvitation: (id: number) => {
    const index = invitations.findIndex((inv) => inv.id === id);

    if (index === -1) return null;

    const deleted = invitations.splice(index, 1);
    return deleted[0];
  },
};