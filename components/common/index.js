// Exporta todos os componentes comuns para facilitar a importação
import AppButton, { 
  PrimaryButton,
  SecondaryButton,
  SuccessButton,
  ErrorButton,
  WarningButton,
  InfoButton,
  SaveButton,
  CancelButton,
  DeleteButton,
  AddButton
} from './AppButton';

// Anexar variantes ao AppButton para permitir o uso como AppButton.VariantName
AppButton.PrimaryButton = PrimaryButton;
AppButton.SecondaryButton = SecondaryButton;
AppButton.SuccessButton = SuccessButton;
AppButton.ErrorButton = ErrorButton;
AppButton.WarningButton = WarningButton;
AppButton.InfoButton = InfoButton;
AppButton.SaveButton = SaveButton;
AppButton.CancelButton = CancelButton;
AppButton.DeleteButton = DeleteButton;
AppButton.AddButton = AddButton;

export { AppButton };

import AppTextField, {
  TextInput,
  NumberInput,
  PasswordInput,
  EmailInput,
  SearchInput,
  CurrencyInput
} from './AppTextField';

// Anexar variantes ao AppTextField para permitir o uso como AppTextField.VariantName
AppTextField.TextInput = TextInput;
AppTextField.NumberInput = NumberInput;
AppTextField.PasswordInput = PasswordInput;
AppTextField.EmailInput = EmailInput;
AppTextField.SearchInput = SearchInput;
AppTextField.CurrencyInput = CurrencyInput;

export { AppTextField };

import AppCard, {
  PrimaryCard,
  SecondaryCard,
  InfoCard,
  SuccessCard,
  WarningCard,
  ErrorCard
} from './AppCard';

// Anexar variantes ao AppCard para permitir o uso como AppCard.VariantName
AppCard.PrimaryCard = PrimaryCard;
AppCard.SecondaryCard = SecondaryCard;
AppCard.InfoCard = InfoCard;
AppCard.SuccessCard = SuccessCard;
AppCard.WarningCard = WarningCard;
AppCard.ErrorCard = ErrorCard;

export { AppCard };

import AppDialog, { ConfirmDialog, DeleteConfirmDialog, InfoDialog } from './AppDialog';

// Anexar variantes ao AppDialog para permitir o uso como AppDialog.VariantName
AppDialog.ConfirmDialog = ConfirmDialog;
AppDialog.DeleteConfirmDialog = DeleteConfirmDialog;
AppDialog.InfoDialog = InfoDialog;

export { AppDialog };

import AppSnackbar, {
  SuccessSnackbar,
  ErrorSnackbar,
  InfoSnackbar,
  WarningSnackbar
} from './AppSnackbar';

// Anexar variantes ao AppSnackbar para permitir o uso como AppSnackbar.VariantName
AppSnackbar.SuccessSnackbar = SuccessSnackbar;
AppSnackbar.ErrorSnackbar = ErrorSnackbar;
AppSnackbar.InfoSnackbar = InfoSnackbar;
AppSnackbar.WarningSnackbar = WarningSnackbar;

export { AppSnackbar };

import AppList, {
  AppListItem,
  ClickableList,
  DenseList
} from './AppList';

// Anexar variantes ao AppList para permitir o uso como AppList.VariantName
AppList.AppListItem = AppListItem;
AppList.ClickableList = ClickableList;
AppList.DenseList = DenseList;

export { AppList };

import AppPage from './AppPage';
export { AppPage };

import AppSelect, {
  SimpleSelect,
  MultiSelect,
  CategorySelect,
  StatusSelect
} from './AppSelect';

// Anexar variantes ao AppSelect para permitir o uso como AppSelect.VariantName
AppSelect.SimpleSelect = SimpleSelect;
AppSelect.MultiSelect = MultiSelect;
AppSelect.CategorySelect = CategorySelect;
AppSelect.StatusSelect = StatusSelect;

export { AppSelect };

import AppSwitch, {
  StatusSwitch,
  AvailabilitySwitch
} from './AppSwitch';

// Anexar variantes ao AppSwitch para permitir o uso como AppSwitch.VariantName
AppSwitch.StatusSwitch = StatusSwitch;
AppSwitch.AvailabilitySwitch = AvailabilitySwitch;

export { AppSwitch };

import AppTable, {
  SimpleTable,
  DenseTable
} from './AppTable';

// Anexar variantes ao AppTable para permitir o uso como AppTable.VariantName
AppTable.SimpleTable = SimpleTable;
AppTable.DenseTable = DenseTable;

export { AppTable };

import AppBox, {
  FlexBox,
  CenterBox,
  SpaceBetweenBox,
  ColumnBox
} from './AppBox';

// Anexar variantes ao AppBox para permitir o uso como AppBox.VariantName
AppBox.FlexBox = FlexBox;
AppBox.CenterBox = CenterBox;
AppBox.SpaceBetweenBox = SpaceBetweenBox;
AppBox.ColumnBox = ColumnBox;

export { AppBox };

import AppTypography, {
  Title,
  Subtitle,
  Highlight,
  Price,
  Description,
  Error
} from './AppTypography';

// Anexar variantes ao AppTypography para permitir o uso como AppTypography.VariantName
AppTypography.Title = Title;
AppTypography.Subtitle = Subtitle;
AppTypography.Highlight = Highlight;
AppTypography.Price = Price;
AppTypography.Description = Description;
AppTypography.Error = Error;

export { AppTypography };

import AppAlert from './AppAlert';
export { AppAlert };

import AppLink from './AppLink';
export { AppLink };

import AppSearchBar from './AppSearchBar';

// Anexar variantes ao AppSearchBar para permitir o uso como AppSearchBar.VariantName
AppSearchBar.Product = AppSearchBar.Product;
AppSearchBar.Category = AppSearchBar.Category;
AppSearchBar.Order = AppSearchBar.Order;

export { AppSearchBar };

import AppCategorySelector from './AppCategorySelector';
export { AppCategorySelector };

import AppProductList from './AppProductList';

// Anexar variantes ao AppProductList para permitir o uso como AppProductList.VariantName
AppProductList.Selectable = AppProductList.Selectable;
AppProductList.WithQuantity = AppProductList.WithQuantity;
AppProductList.ReadOnly = AppProductList.ReadOnly;

export { AppProductList };

import AppCartItem from './AppCartItem';

// Anexar variantes ao AppCartItem para permitir o uso como AppCartItem.VariantName
AppCartItem.ReadOnly = AppCartItem.ReadOnly;
AppCartItem.WithControls = AppCartItem.WithControls;

export { AppCartItem };

import AppFilter from './AppFilter';

// Anexar variantes ao AppFilter para permitir o uso como AppFilter.VariantName
AppFilter.Item = AppFilter.Item;
AppFilter.FullWidthItem = AppFilter.FullWidthItem;
AppFilter.HalfWidthItem = AppFilter.HalfWidthItem;

export { AppFilter };

import AppModal from './AppModal';

// Anexar variantes ao AppModal para permitir o uso como AppModal.VariantName
AppModal.Cart = AppModal.Cart;
AppModal.Confirmation = AppModal.Confirmation;
AppModal.Delete = AppModal.Delete;
AppModal.Form = AppModal.Form;

export { AppModal };

import AppEmptyState from './AppEmptyState';

// Anexar variantes ao AppEmptyState para permitir o uso como AppEmptyState.VariantName
AppEmptyState.Cart = AppEmptyState.Cart;
AppEmptyState.Products = AppEmptyState.Products;
AppEmptyState.Orders = AppEmptyState.Orders;
AppEmptyState.Search = AppEmptyState.Search;

export { AppEmptyState };

import AppLoginForm from './AppLoginForm';
export { AppLoginForm };

import AppAuthLayout from './AppAuthLayout';
export { AppAuthLayout };
