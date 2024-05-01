import { create } from "zustand";

const modalStore = create((set) => ({
  isShow: false,
  modalContent: null,
  toggleModal: () => set((state) => ({ isShow: !state.isShow })),
  setModalContent: (state) => set({ modalContent: state }),
}));
export default modalStore;
