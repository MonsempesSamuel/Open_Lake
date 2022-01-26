'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">open-lake-web documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-4d7357ccca663e59a1cb690683882d5a0e4b8e14dd3094f091b7825129032784d962ef8ae78c9485895a9c2802531b913e6bc68008973b7129d57922bb1cb8fa"' : 'data-target="#xs-components-links-module-AppModule-4d7357ccca663e59a1cb690683882d5a0e4b8e14dd3094f091b7825129032784d962ef8ae78c9485895a9c2802531b913e6bc68008973b7129d57922bb1cb8fa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4d7357ccca663e59a1cb690683882d5a0e4b8e14dd3094f091b7825129032784d962ef8ae78c9485895a9c2802531b913e6bc68008973b7129d57922bb1cb8fa"' :
                                            'id="xs-components-links-module-AppModule-4d7357ccca663e59a1cb690683882d5a0e4b8e14dd3094f091b7825129032784d962ef8ae78c9485895a9c2802531b913e6bc68008973b7129d57922bb1cb8fa"' }>
                                            <li class="link">
                                                <a href="components/AccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnalysisAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalysisAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnalysisDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalysisDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnalysisListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalysisListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BackgroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BackgroundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BgPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BgPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropdownPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FourOhFourComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FourOhFourComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LakeAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LakeAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LakeDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LakeDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LakeListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LakeListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LicenceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LicenceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OverviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OverviewElementsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OverviewElementsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PersonalDataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonalDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDocComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-4d7357ccca663e59a1cb690683882d5a0e4b8e14dd3094f091b7825129032784d962ef8ae78c9485895a9c2802531b913e6bc68008973b7129d57922bb1cb8fa"' : 'data-target="#xs-injectables-links-module-AppModule-4d7357ccca663e59a1cb690683882d5a0e4b8e14dd3094f091b7825129032784d962ef8ae78c9485895a9c2802531b913e6bc68008973b7129d57922bb1cb8fa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-4d7357ccca663e59a1cb690683882d5a0e4b8e14dd3094f091b7825129032784d962ef8ae78c9485895a9c2802531b913e6bc68008973b7129d57922bb1cb8fa"' :
                                        'id="xs-injectables-links-module-AppModule-4d7357ccca663e59a1cb690683882d5a0e4b8e14dd3094f091b7825129032784d962ef8ae78c9485895a9c2802531b913e6bc68008973b7129d57922bb1cb8fa"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpXsrfInterceptorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HttpXsrfInterceptorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Analysis.html" data-type="entity-link" >Analysis</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnalysisList.html" data-type="entity-link" >AnalysisList</a>
                            </li>
                            <li class="link">
                                <a href="classes/Data.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatasList.html" data-type="entity-link" >DatasList</a>
                            </li>
                            <li class="link">
                                <a href="classes/Details.html" data-type="entity-link" >Details</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lake.html" data-type="entity-link" >Lake</a>
                            </li>
                            <li class="link">
                                <a href="classes/LakeList.html" data-type="entity-link" >LakeList</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyErrorStateMatcher.html" data-type="entity-link" >MyErrorStateMatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyErrorStateMatcher-1.html" data-type="entity-link" >MyErrorStateMatcher</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AnalysisService.html" data-type="entity-link" >AnalysisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpXsrfInterceptorService.html" data-type="entity-link" >HttpXsrfInterceptorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LakesService.html" data-type="entity-link" >LakesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegisterService.html" data-type="entity-link" >RegisterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionLoginService.html" data-type="entity-link" >SessionLoginService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});