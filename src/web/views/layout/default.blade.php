<div
    class="page-layout page-layout--default"
>
    @include('shared.header')
    @include('shared.debug-bar')
    @include('shared.maintenance-bar')
    <div class="page-layout-content">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-7 col-lg-8">
                    @include($page['template'])
                    @include('shared.page-elements')
                </div>
                <div class="col-12 col-md-5 col-lg-4">
                    @include('shared.sidebar')
                </div>
            </div>
        </div>
    </div>
    @include('shared.footer')
    @include('shared.cookiebot')
</div>
@include('shared.debugbar')