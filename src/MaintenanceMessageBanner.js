import React, {Component} from 'react';
import './styles/MaintenanceMessageBanner.css';
import HighlightImg from './highlight.png';

class MaintenanceMessageBanner extends Component {
    constructor(props) {
        super(props);

        this.state = { visible: false };
    }

    componentDidMount() {
        if (!sessionStorage.getItem('hide-MaintenanceMessageBanner')) {
            this.setState({
                visible: true
            });
        }
    }

    trySaveHiddenState() {
        if (!sessionStorage) return;
        // session storage lasts until tab is closed
        sessionStorage.setItem('hide-MaintenanceMessageBanner', 'true');
    }

    hideNotification() {
        this.setState({ visible: false });
        this.trySaveHiddenState();
    }
    
    render() {
        let style = { backgroundImage: HighlightImg };
        if (!this.state.visible) {
            style.display = "none";
        }
        return (
            <div className="MaintenanceMessageBanner" style={style}>
                <div className="MaintenanceMessageBanner__container">
                    <span className="MaintenanceMessageBanner__container__psa">[<time>{this.props.date}</time>]&nbsp;</span>
                    <span className="MaintenanceMessageBanner__container__message">{this.props.children}</span>
                    <span className="MaintenanceMessageBanner__close">
                        <a href="#" onClick={this.hideNotification.bind(this)}>[close]</a>
                    </span>
                </div>
            </div>
        );
    }
}

export default MaintenanceMessageBanner;