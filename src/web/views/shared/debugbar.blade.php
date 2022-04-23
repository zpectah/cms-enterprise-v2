{{--
Development debugbar
--}}
@if(APP_DEBUG)
    <debug-bar>
        <template v-slot:t-page>
            @json($_page)
        </template>
        <template v-slot:t-category>
            @json($_category)
        </template>
        <template v-slot:t-detail>
            @json($_detail)
        </template>
        <template v-slot:page>
            @json($page)
        </template>
        <template v-slot:detail>
            @json($detail)
        </template>
        <template v-slot:category-context>
            @json($category_context)
        </template>
        <template v-slot:search-results>
            @json($search_results)
        </template>
        <template v-slot:route>
            @json($route)
        </template>
        <template v-slot:language>
            @json($language)
        </template>
        <template v-slot:lang>
            @json($lang)
        </template>
        <template v-slot:translations>
            @json($translations)
        </template>
        <template v-slot:menu>
            @json($menu)
        </template>
        <template v-slot:company>
            @json($company)
        </template>
        <template v-slot:public>
            @json($public)
        </template>
        <template v-slot:members-options>
            @json($members_options)
        </template>
        <template v-slot:member>
            @json($member)
        </template>
        <template v-slot:custom-data>
            @json($custom_data)
        </template>
    </debug-bar>
@endif
