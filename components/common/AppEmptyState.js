import React from 'react';

import { SvgIcon } from '@mui/material';

import { AppBox, AppTypography, AppButton } from './index';

const AppEmptyState = ({

  icon,

  title,

  description,

  action,

  sx = {},

  ...props

}) => {

  return (

    <AppBox.ColumnBox 

      sx={{ 

        py: 4, 

        px: 2,

        alignItems: 'center', 

        justifyContent: 'center',

        ...sx

      }}

      {...props}

    >

      {icon && (

        <SvgIcon 

          component={icon} 

          sx={{ 

            fontSize: 60, 

            color: 'grey.400', 

            mb: 2 

          }} 

        />

      )}

      

      {title && (

        <AppTypography.Subtitle 

          align="center" 

          color="text.secondary"

        >

          {title}

        </AppTypography.Subtitle>

      )}

      

      {description && (

        <AppTypography.Description 

          align="center" 

          color="text.secondary" 

          sx={{ mt: 1 }}

        >

          {description}

        </AppTypography.Description>

      )}

      

      {action && (

        <AppBox sx={{ mt: 3 }}>

          {action}

        </AppBox>

      )}

    </AppBox.ColumnBox>

  );

};

AppEmptyState.Cart = ({ onAddItems, ...props }) => (

  <AppEmptyState

    icon={require('@mui/icons-material/ShoppingCart').default}

    title="Seu carrinho está vazio"

    description="Adicione itens para continuar"

    action={

      onAddItems && (

        <AppButton.PrimaryButton 

          onClick={onAddItems}

          startIcon={require('@mui/icons-material/Add').default}

        >

          Adicionar Itens

        </AppButton.PrimaryButton>

      )

    }

    {...props}

  />

);

AppEmptyState.Products = ({ onAddProduct, ...props }) => (

  <AppEmptyState

    icon={require('@mui/icons-material/Inventory').default}

    title="Nenhum produto encontrado"

    description="Tente ajustar os filtros ou adicione um novo produto"

    action={

      onAddProduct && (

        <AppButton.AddButton 

          onClick={onAddProduct}

        >

          Novo Produto

        </AppButton.AddButton>

      )

    }

    {...props}

  />

);

AppEmptyState.Orders = ({ ...props }) => (

  <AppEmptyState

    icon={require('@mui/icons-material/Receipt').default}

    title="Nenhum pedido encontrado"

    description="Não há pedidos para exibir no momento"

    {...props}

  />

);

AppEmptyState.Search = ({ searchTerm, onClearSearch, ...props }) => (

  <AppEmptyState

    icon={require('@mui/icons-material/Search').default}

    title="Nenhum resultado encontrado"

    description={`Não encontramos resultados para "${searchTerm}"`}

    action={

      onClearSearch && (

        <AppButton.SecondaryButton 

          onClick={onClearSearch}

          startIcon={require('@mui/icons-material/Clear').default}

        >

          Limpar Busca

        </AppButton.SecondaryButton>

      )

    }

    {...props}

  />

);

export default AppEmptyState;

