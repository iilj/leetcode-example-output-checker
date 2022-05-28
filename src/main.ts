import label_ac from './label-ac.html';
import label_wa from './label-wa.html';

(() => {
    // サンプルの出力をかき集める
    console.log('[LEOC] contest problem page');
    const labels = document.querySelectorAll('div.question-content pre strong');

    // サンプル出力の個数を検出する
    const outputs: string[] = [];
    labels.forEach((strong: Element) => {
        if (
            strong.textContent === null ||
            (strong.textContent.trim() !== 'Output:' && strong.textContent.trim() !== 'Output') ||
            strong.nextSibling === null ||
            strong.nextSibling.textContent === null
        ) {
            return;
        }
        if (strong.textContent.trim() === 'Output:') {
            // 通常
            const output: string = strong.nextSibling.textContent.trim();
            outputs.push(output);
        } else {
            // [null, [0, 0], [], true, false] とかになっている．スペースを除去する．
            const output: string = strong.nextSibling.textContent.trim().split(' ').join('');
            outputs.push(output);
        }
    });
    console.log('[LEOC] outputs', outputs);

    window.addEventListener('load', () => {
        const onload = () => {
            // 提出結果 div が出るまで若干待つ
            const result_div = document.querySelector('div.submission-result-base');
            if (result_div === null) {
                console.warn('[LEOC] result_div not found. Retrying.');
                window.setTimeout(onload, 2000);
                return;
            }
            const observer = new MutationObserver(() => {
                // 提出結果の更新が始まったときに走る
                /** DOMの変化が起こった時の処理 */
                console.log('[LEOC] observer callback triggered.');
                const answer_labels: NodeListOf<HTMLHeadingElement> = result_div.querySelectorAll('h5');
                const yourAnswerPre: HTMLPreElement | null = Array.from(answer_labels).reduce(
                    (prev, h5): HTMLPreElement | null => {
                        if (h5.textContent?.trim() !== 'Your answer') {
                            return prev;
                        }
                        return h5.nextSibling as HTMLPreElement | null;
                    },
                    null as HTMLPreElement | null
                );
                if (yourAnswerPre === null) {
                    console.warn('[LEOC] Answer <pre> not found.');
                    return;
                }

                const yourInputPre: HTMLPreElement | null = Array.from(answer_labels).reduce(
                    (prev, h5): HTMLPreElement | null => {
                        if (h5.textContent?.trim() !== 'Your input') {
                            return prev;
                        }
                        return h5.nextSibling as HTMLPreElement | null;
                    },
                    null as HTMLPreElement | null
                );
                if (yourInputPre === null) {
                    console.warn('[LEOC] Input <pre> not found.');
                    return;
                }

                console.log(`[LEOC] answer status: ${yourAnswerPre.textContent?.trim() ?? ''}`); // Pending

                const observer2 = new MutationObserver(() => {
                    // Pending から別の内容に切り替わったときに走る
                    console.log(
                        `[LEOC] observer2 callback triggered. status: ${yourAnswerPre.textContent?.trim() ?? ''}`
                    );
                    // pre の中に span があり，各 span が行になっている．
                    // br は textContent では消えるので，span を走査して答えを集める
                    const answerSpans = Array.from(yourAnswerPre.querySelectorAll('span'));
                    console.log('[LEOC] answerSpans', answerSpans);

                    // 出力の個数が一致しないなら，やめる
                    if (outputs.length !== answerSpans.length) return;

                    // 入力がサンプルと同一かどうか
                    if (yourInputPre.textContent?.trim() !== pageData.questionExampleTestcases.trim()) {
                        return;
                    }

                    console.log('[LEOC] Example testcase execution detected');
                    // 監視を停止する
                    observer2.disconnect();
                    // AC かどうか判定していく
                    for (let i = 0; i < answerSpans.length; ++i) {
                        const yourAnswer: string | undefined = answerSpans[i].textContent?.trim();
                        const expectedAnswer = outputs[i];
                        console.log(`[LEOC] yourAnswer: ${yourAnswer ?? ''}, expected: ${expectedAnswer}`);
                        if (yourAnswer === expectedAnswer) {
                            answerSpans[i].insertAdjacentHTML('beforeend', label_ac);
                        } else {
                            answerSpans[i].insertAdjacentHTML('beforeend', label_wa);
                        }
                    }
                });
                const config2 = {
                    attributes: true,
                    childList: true,
                    characterData: true,
                };
                observer2.observe(yourAnswerPre, config2);
            });
            const config = {
                attributes: true,
                childList: true,
                characterData: true,
            };
            console.log('[LEOC] result_div', result_div);
            observer.observe(result_div, config);
        };

        window.setTimeout(onload, 2000);
    });
})();
