import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  paymentModalOpen: boolean;
  paymentModalConfig: {
    amount: number;
    description: string;
    metadata: Record<string, string>;
    onSuccess?: () => void;
  } | null;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openPaymentModal: (config: NonNullable<UIState['paymentModalConfig']>) => void;
  closePaymentModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  paymentModalOpen: false,
  paymentModalConfig: null,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  openPaymentModal: (config) =>
    set({
      paymentModalOpen: true,
      paymentModalConfig: config,
    }),

  closePaymentModal: () =>
    set({
      paymentModalOpen: false,
      paymentModalConfig: null,
    }),
}));
