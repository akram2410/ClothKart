import { connect } from "redux";
import { compose } from "react";
import { createStructuredSelector } from "reselect";

import CollectionsOverview from "./collections-overview.component";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});
const CollectionOverViewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionOverViewContainer;
