export interface CodeDefinition {
    /** 'cpp' など */
    readonly value: string;
    /** 'C++' など */
    readonly text: string;
    /** 'class Solution{public:int hogehoge(arg...){}}' など */
    readonly defaultCode: string;
}

export interface MetaData {
    /** "minimumLines" など */
    readonly name: string;
    readonly params: {
        /** "stockPrices" など */
        readonly name: string;
        /** "integer[][]" など */
        readonly type: string;
    }[];
    readonly return: {
        /** "integer" など */
        readonly type: string;
    };
}

export interface PageData {
    /** '2367' など */
    readonly questionId: string;
    /** '' など */
    readonly questionIdHash: string;
    /** 'minimum-lines-to-represent-a-line-chart' など */
    readonly questionTitleSlug: string;
    /** 'Minimum Lines to Represent a Line Chart' など */
    readonly questionTitle: string;
    /** '[[1,7],[2,6],[3,5],[4,4],[5,4],[6,3],[7,2],[8,1]]\n[[3,4],[1,2],[7,8],[2,3]]' など */
    readonly questionExampleTestcases: string;
    /** 'Algorithms' など */
    readonly categoryTitle: string;
    /** 'weekly-contest-294' など */
    readonly contestTitleSlug: string;
    /** '/accounts/login/?next=/problems/minimum-lines-to-represent-a-line-chart/' など */
    readonly loginUrl: string;
    /** true など */
    readonly isSignedIn: boolean;

    /** '0' など */
    readonly sessionId: string;
    readonly reverseUrl: {
        latest_submission: '/submissions/latest/';
        account_login: '/accounts/login/';
        maintenance: '/maintenance/';
        profile: '/profile/';
    };
    /** true など */
    readonly enableRunCode: boolean;
    /** true など */
    readonly enableSubmit: boolean;
    /** '/contest/api/weekly-contest-294/problems/minimum-lines-to-represent-a-line-chart/submit/' など */
    readonly submitUrl: string;
    /** '/contest/api/weekly-contest-294/problems/minimum-lines-to-represent-a-line-chart/interpret_solution/' */
    readonly interpretUrl: string;
    /** 'large' など */
    readonly judgeType: string;
    /** null など */
    readonly nextChallengePairs: null;
    /** 言語とテンプレの一覧 */
    readonly codeDefinition: CodeDefinition[];
    /** false など */
    readonly enableTestMode: boolean;
    /** メタデータ */
    readonly metaData: MetaData;
    /** 初期入力のテストケース．'[[1,7],[2,6],[3,5],[4,4],[5,4],[6,3],[7,2],[8,1]]' など */
    readonly sampleTestCase: string;
    /** true など */
    readonly judgerAvailable: boolean;
    /** { "cpp": ["C++", "<p>Compiled with <code> clang 11 </code> using the latest C++ 17 standard.</p>..."], ...} */
    readonly envInfo: { [key: string]: [string, string] };
}
