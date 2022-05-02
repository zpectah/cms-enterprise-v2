{{--
Heading section

* $pageTitle
* $pageDescription
* $pageMeta

--}}
<section class="section section--heading">
    <h1 class="title title--page">
        {{$pageTitle}}
    </h1>
    @if(isset($pageDescription))
        <section class="section">
            <p class="lead">
                {{$pageDescription}}
            </p>
        </section>
    @endif
    @if(isset($pageMeta))
        <p class="text-muted">
            {{$pageMeta}}
        </p>
    @endif
</section>