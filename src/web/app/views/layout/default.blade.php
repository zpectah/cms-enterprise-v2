<div
        id="vue-app"
        class="page-layout page-layout--default"
>
    @include('shared.header')
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-7 col-lg-8">
                @include($page['template'])
            </div>
            <div class="col-12 col-md-5 col-lg-4">
                @include('shared.sidebar')
            </div>
        </div>
    </div>
    @include('shared.footer')
</div>