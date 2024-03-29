import { createSlice } from "@reduxjs/toolkit";
import { BankAccountsInitialState } from "../types/piggyBank";

const bankAccountsInitialState: BankAccountsInitialState = {
  accounts: [
    {
      accountName: "Rachunek 1",
      accountId: "0",
      currency: "PLN",
      bankAccountStatus: 0,
      yearSavings: [],
      yearsSavings: [],
      currentYear: new Date().getFullYear(),
      status: "OPEN",
    },
  ],
  activeAccount: { accountName: "Rachunek 1", accountId: "0", currency: "PLN" },
};

const bankAccountsSlice = createSlice({
  name: "bankAccounts",
  initialState: bankAccountsInitialState,
  reducers: {
    setBankAccount: (state, action) => {
      state.accounts = [
        {
          accountName: "Rachunek 1",
          accountId: "UNIQUE",
          currency: "PLN",
          bankAccountStatus: action.payload.bankAccountStatus,
          yearSavings: [],
          yearsSavings: [],
          currentYear: new Date().getFullYear(),
          status: "OPEN",
        },
      ];
      state.activeAccount = {
        accountName: "Rachunek 1",
        accountId: action.payload.accountId,
        currency: "PLN",
      };
    },
    addBankAccount: (state, action) => {
      state.accounts = [
        ...state.accounts,
        {
          accountName: action.payload.accountName,
          accountId: action.payload.accountId,
          currency: action.payload.currency,
          bankAccountStatus: action.payload.bankAccountStatus,
          yearSavings: [],
          yearsSavings: [],
          currentYear: new Date().getFullYear(),
          status: "OPEN",
        },
      ];
      state.activeAccount = {
        accountName: action.payload.accountName,
        accountId: action.payload.accountId,
        currency: action.payload.currency,
      };
    },
    setActiveBankAccount: (state, action) => {
      state.activeAccount = {
        accountName: action.payload.accountName,
        accountId: action.payload.accountId,
        currency: action.payload.currency,
      };
    },
    updateMonth: (state, action) => {
      state.accounts = state.accounts.map((item) => ({
        accountName: item.accountName,
        accountId: item.accountId,
        currency: item.currency,
        bankAccountStatus:
          Number(item.bankAccountStatus) +
          Number(
            action.payload.savings[
              action.payload.savings.findIndex(
                (saving: { bankAccountId: string; savings: number }) =>
                  saving.bankAccountId === item.accountId
              )
            ].savings
          ),
        yearSavings: [
          ...item.yearSavings,
          {
            month: action.payload.month,
            savings:
              action.payload.savings[
                action.payload.savings.findIndex(
                  (saving: { bankAccountId: string; savings: number }) =>
                    saving.bankAccountId === item.accountId
                )
              ].savings,
          },
        ],
        yearsSavings: item.yearsSavings,
        currentYear: item.currentYear,
        status: item.status,
      }));

      //wyzeruj wartości przychodów w tablicy z przychodami z aktualnego miesiąca

      //TEST
      // if (new Date(dateCheck).getFullYear() > state.curentYear) {
      //         const yearToSet = new Date(dateCheck).getFullYear() - 1;
      if (
        new Date().getFullYear() >
        state.accounts[
          state.accounts.findIndex((i) => i.accountId === "UNIQUE")
        ].currentYear
      ) {
        const yearToSet = new Date().getFullYear() - 1;

        state.accounts = state.accounts.map((item) => ({
          accountName: item.accountName,
          accountId: item.accountId,
          currency: item.currency,
          status: item.status,
          bankAccountStatus: Number(item.bankAccountStatus),
          yearSavings: [],
          yearsSavings: [
            ...item.yearsSavings,
            {
              year: yearToSet,
              sumOfSavings: item.yearSavings
                .map((el) => Number(el.savings))
                .reduce((partialSum, a) => partialSum + a, 0),
              months: item.yearSavings,
            },
          ],
          currentYear: new Date().getFullYear(),
        }));

        //   //wyzeruj wartości przychodów w tablicy z przychodami z poprzedniego roku
        //   toUpdate[0].yearSavings = [];
        // }
        //TEST
        // state.curentYear = new Date(dateCheck).getFullYear();
        // toUpdate[0].currentYear = new Date().getFullYear();
      }
    },
    updateBankAccountStatusRealisedFinantialTarget: (state, action) => {
      state.accounts[
        state.accounts.findIndex(
          (item) => item.accountId === action.payload.accountId
        )
      ].bankAccountStatus =
        state.accounts[
          state.accounts.findIndex(
            (item) => item.accountId === action.payload.accountId
          )
        ].bankAccountStatus - action.payload.value;
    },
    setCurrentYear: (state) => {
      //TEST
      // state.curentYear = new Date(dateCheck).getFullYear();
      state.accounts = state.accounts.map((item) => ({
        accountName: item.accountName,
        accountId: item.accountId,
        currency: item.currency,
        bankAccountStatus: item.bankAccountStatus,
        yearSavings: item.yearSavings,
        yearsSavings: item.yearsSavings,
        status: item.status,
        currentYear: new Date().getFullYear(),
      }));
    },
    editBankAccount: (state, action) => {
      const accountIndex = state.accounts.findIndex(
        (item) => item.accountId === action.payload.accountId
      );
      state.accounts[accountIndex].accountName = action.payload.accountName;
      state.accounts[accountIndex].currency =
        action.payload.currency.toUpperCase();
      state.activeAccount = {
        accountName: action.payload.accountName,
        accountId: action.payload.accountId,
        currency: action.payload.currency.toUpperCase(),
      };
    },
    deleteBankAccount: (state, action) => {
      if (action.payload.accountId !== "UNIQUE") {
        const accountIndex = state.accounts.findIndex(
          (item) => item.accountId === action.payload.accountId
        );
        state.accounts[accountIndex].status = "CLOSED";
        if (state.activeAccount.accountId === action.payload.accountId) {
          const openAccounts = state.accounts.filter(
            (item) => item.status === "OPEN"
          );

          state.activeAccount = {
            accountName: openAccounts[0].accountName,
            accountId: openAccounts[0].accountId,
            currency: openAccounts[0].currency,
          };
        }
      }
    },
  },
});

export const setBankAccount = bankAccountsSlice.actions.setBankAccount;
export const addBankAccount = bankAccountsSlice.actions.addBankAccount;
export const setActiveBankAccount =
  bankAccountsSlice.actions.setActiveBankAccount;
export const updateMonthBankAccounts = bankAccountsSlice.actions.updateMonth;
export const updateBankAccountStatusRealisedFinantialTarget =
  bankAccountsSlice.actions.updateBankAccountStatusRealisedFinantialTarget;
export const editBankAccount = bankAccountsSlice.actions.editBankAccount;
export const deleteBankAccount = bankAccountsSlice.actions.deleteBankAccount;
export default bankAccountsSlice.reducer;
