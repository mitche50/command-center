import * as React from "react";

import BigNumber from "bignumber.js";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { withdrawReward } from "../../actions/trader/darknode";
import { Token } from "../../lib/tokens";
import { ApplicationData } from "../../reducers/types";

interface FeesProps extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
    disabled: boolean;
    token: Token;
    amount: string | BigNumber;
    darknodeID: string;
}

interface FeesState {
    disabled: boolean;
}

class FeesItemClass extends React.Component<FeesProps, FeesState> {
    constructor(props: FeesProps) {
        super(props);
        this.state = {
            disabled: (new BigNumber(this.props.amount)).lte(0)
        };
    }

    public render(): JSX.Element {
        const disabled = this.state.disabled || !this.props.disabled;
        return (
            <button
                className="withdraw-fees"
                disabled={disabled}
                onClick={disabled ? undefined : this.handleWithdraw}
            >
                <FontAwesomeIcon icon={faChevronRight} pull="left" />
            </button>
        );
    }

    private handleWithdraw = async (): Promise<void> => {
        const { store, darknodeID, token } = this.props;
        const { sdk } = store;
        this.setState({ disabled: true });

        this.props.actions.withdrawReward(sdk, darknodeID, token);
    }
}

const mapStateToProps = (state: ApplicationData) => ({
    store: {
        sdk: state.trader.sdk,
    },
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        withdrawReward,
    }, dispatch),
});

export const FeesItem = connect(mapStateToProps, mapDispatchToProps)(FeesItemClass);
