import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async ({ jwt }, thunkAPI) => {
    try {
      const now = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);

      const startDate = sevenDaysAgo.toISOString();
      const endDate = now.toISOString();

     

      const response = await axios.post(
        "https://api-dev.docnova.ai/invoice/search",
        {
          companyId: "01c880ca-46b5-4699-a477-616b84770071",
          documentType: "OUTGOING",
          startDate,
          endDate,
          page: 0,
          size: 20,
          referenceDocument: "",
          type: null,
          status: null,
          paymentStatus: null,
          isDeleted: false,
        },
        {
          headers: { "R-Auth": jwt },
        }
      );

      
      return response.data;
    } catch (error) {
      
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedInvoice(state, action) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;


        const content = action.payload?.invoices?.content;

        if (Array.isArray(content)) {
          state.list = content;
        } else {
          state.list = [];
        }
      })

      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
