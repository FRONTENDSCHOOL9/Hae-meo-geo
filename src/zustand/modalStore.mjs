import { create } from "zustand";

const modalStore = create((set) => ({
  isShow: false,
  modalData: {},
  toggleModal: () => set((state) => ({ isShow: !state.isShow })),
  setModalData: (state) => set({ modalData: state }),
}));
export default modalStore;
