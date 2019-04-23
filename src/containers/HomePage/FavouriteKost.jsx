import React, {Component} from 'react';
import styled from 'styled-components'

const WrapperFavourite = styled('div')`
  width: 100%;
  display: flex;
  overflow: auto;

`

const ContentWrapper = styled('div')`
  padding: 10px;
`

const DummyImage = styled('div')`
    background-image: url("assets/images/dummy.jpg");
    width: 300px;
    height: 250px;
    background-position: 50%;
    background-size: cover;
`

const ContentDecription = styled('div')`
  padding: 13px;
`

class FavouriteKost extends Component {
    render() {
        return (
            <WrapperFavourite>
                <ContentWrapper>
                    <DummyImage/>
                    <ContentDecription>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aperiam aut cupiditate deserunt, et ex fuga impedit ipsam molestiae nam, nihil nulla obcaecati perferendis quae quidem repellendus voluptas voluptate.
                    </ContentDecription>
                </ContentWrapper>
                <ContentWrapper>
                    <DummyImage/>
                    <ContentDecription>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aperiam aut cupiditate deserunt, et ex fuga impedit ipsam molestiae nam, nihil nulla obcaecati perferendis quae quidem repellendus voluptas voluptate.
                    </ContentDecription>
                </ContentWrapper>
                <ContentWrapper>
                    <DummyImage/>
                    <ContentDecription>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aperiam aut cupiditate deserunt, et ex fuga impedit ipsam molestiae nam, nihil nulla obcaecati perferendis quae quidem repellendus voluptas voluptate.
                    </ContentDecription>
                </ContentWrapper>
                <ContentWrapper>
                    <DummyImage/>
                    <ContentDecription>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aperiam aut cupiditate deserunt, et ex fuga impedit ipsam molestiae nam, nihil nulla obcaecati perferendis quae quidem repellendus voluptas voluptate.
                    </ContentDecription>
                </ContentWrapper>
                <ContentWrapper>
                    <DummyImage/>
                    <ContentDecription>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aperiam aut cupiditate deserunt, et ex fuga impedit ipsam molestiae nam, nihil nulla obcaecati perferendis quae quidem repellendus voluptas voluptate.
                    </ContentDecription>
                </ContentWrapper>
                <ContentWrapper>
                    <DummyImage/>
                    <ContentDecription>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet aperiam aut cupiditate deserunt, et ex fuga impedit ipsam molestiae nam, nihil nulla obcaecati perferendis quae quidem repellendus voluptas voluptate.
                    </ContentDecription>
                </ContentWrapper>

            </WrapperFavourite>
        );
    }
}

export default FavouriteKost;