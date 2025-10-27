/**
 * Main App Component
 * Setup routing dengan React Router
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import { AppLayout } from './components/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { InventoryListPage } from './pages/InventoryListPage';
import { AddInboundPage } from './pages/AddInboundPage';

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="inventory" element={<InventoryListPage />} />
              <Route path="inbound/new" element={<AddInboundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
