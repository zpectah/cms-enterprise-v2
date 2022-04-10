@php
    $menuType = $type ?? 'horizontal'; // horizontal | vertical
@endphp
<nav class="navigation navigation--{{$menuType}}">
    @include('component.menu')
</nav>