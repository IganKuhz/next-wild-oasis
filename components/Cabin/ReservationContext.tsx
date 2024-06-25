'use client';

import { createContext, useContext, useState } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

type ReservationContextType = {
  range: DateRange | undefined;
  setRange: SelectRangeEventHandler;
  resetRange: () => void;
};

// 1. Create a context to store the reservation range
const ReservationContext = createContext<ReservationContextType | null>(null);

// 2. Create a provider component to wrap the application
const initialState: DateRange | undefined = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange(initialState);

  const ctxValue: ReservationContextType = {
    range,
    setRange,
    resetRange,
  };

  return (
    <ReservationContext.Provider value={ctxValue}>
      {children}
    </ReservationContext.Provider>
  );
}

// 3. Create a custom hook to consume the context
function useReservation() {
  const context = useContext(ReservationContext);

  if (context === null) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
}

// 4. Export the provider and the custom hook
export { ReservationProvider, useReservation };
