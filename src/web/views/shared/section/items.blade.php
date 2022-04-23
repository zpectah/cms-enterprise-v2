{{--
Section Items list

* $sectionTitle
* $context
* $itemsList

--}}
<section class="section section--items">
    @include('shared.section.section-title', [ 'title' => $sectionTitle ])
    @include('component.article-list', [
        'itemsList' => $itemsList,
    ])
</section>