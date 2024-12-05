import { create } from 'zustand'
import { SaleType } from './types';
import { salesData } from './sales-data';

interface SalesAppState {
    allSales: SaleType[]
    openDeleteDialog: boolean
    selectedSale: SaleType | null
    setSelectedSale: (sale: SaleType | null) => void
    isLoading: boolean
    openDealDialog: boolean
    setOpenDealDialog: (open: boolean) => void
    setOpenDeleteDialog: (open: boolean) => void
    loadAllSales: () => Promise<void>
    addSale: (newSale: SaleType) => Promise<{ success: boolean }>
    deleteSale: (saleId: string) => Promise<{ success: boolean }>
    updateSale: (updatedSale: SaleType) => Promise<{ success: boolean }>
}

export const useSalesStore = create<SalesAppState>()((set) => ({
    allSales: [],
    openDeleteDialog: false,
    isLoading: false,
    selectedSale: null,
    openDealDialog: false,
    setOpenDealDialog: (open: boolean) => set({ openDealDialog: open }),
    setOpenDeleteDialog: (open: boolean) => set({ openDeleteDialog: open }),
    setSelectedSale: (sale: SaleType | null) => set({ selectedSale: sale }),
    loadAllSales: async () => {
        set({ allSales: await fetchAllSales() })
    },
    addSale: async (newSale: SaleType) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            set((state) => ({
                allSales: [...state.allSales, newSale],
            }))
            return { success: true }
        } finally {
            set({ isLoading: false })
        }
    },

    updateSale: async (updatedSale: SaleType) => {
        set({ isLoading: true })
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            set((state) => ({
                allSales: state.allSales.map((sale) => {
                    if (sale.id === updatedSale.id) {
                        return updatedSale
                    } else {
                        return sale
                    }
                }),
            }))
            return { success: true }
        } finally {
            set({ isLoading: false })
            set({ selectedSale: null })
            set({ openDealDialog: false })
        }
    },

    deleteSale: async (saleId: string) => {
        set({ isLoading: true })
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            set((state) => ({
                allSales: state.allSales.filter((sale) => sale.id !== saleId),
            }))
            return { success: true }
        } finally {
            set({ selectedSale: null })
            set({ isLoading: false })
        }
    }
}))

async function fetchAllSales(): Promise<SaleType[]> {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(salesData)
        }, 1200)
    })
}